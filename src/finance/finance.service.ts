import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.financeFlow.findMany({ orderBy: { date: 'asc' } });
  }

  async create(payload: { date: string; reference: string; libelle: string; debit: number; credit: number; studentId?: number; moyen?: string; statut?: string }) {
    const last = await this.prisma.financeFlow.findFirst({ orderBy: { id: 'desc' } });
    const solde = (last?.solde ?? 0) + payload.credit - payload.debit;
    return this.prisma.financeFlow.create({
      data: { ...payload, date: new Date(payload.date), solde },
    });
  }

  async monthlyStats() {
    const flows = await this.prisma.financeFlow.findMany();
    return flows.reduce<Record<string, { debit: number; credit: number }>>((acc, flow) => {
      const month = flow.date.toISOString().slice(0, 7);
      acc[month] = acc[month] ?? { debit: 0, credit: 0 };
      acc[month].debit += flow.debit;
      acc[month].credit += flow.credit;
      return acc;
    }, {});
  }
}
