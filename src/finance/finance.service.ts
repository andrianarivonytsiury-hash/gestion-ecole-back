import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  list() {
    return this.prisma.financeFlow.findMany({ orderBy: { date: 'asc' } });
  }

  async create(payload: { date: string; reference: string; libelle: string; debit: number; credit: number; studentId?: number; moyen?: string; statut?: string }) {
    const last = await this.prisma.financeFlow.findFirst({ orderBy: { id: 'desc' } });
    const solde = (last?.solde ?? 0) + payload.credit - payload.debit;
    const flow = await this.prisma.financeFlow.create({
      data: { ...payload, date: new Date(payload.date), solde },
    });
    await this.recalculateSoldes();
    this.events.emit('finance:updated', { studentId: payload.studentId, id: flow.id, action: 'created' });
    return flow;
  }

  async update(
    id: number,
    payload: Partial<{
      date: string;
      reference: string;
      libelle: string;
      debit: number;
      credit: number;
      studentId?: number;
      moyen?: string;
      statut?: string;
    }>,
  ) {
    await this.prisma.financeFlow.update({
      where: { id },
      data: {
        ...payload,
        date: payload.date ? new Date(payload.date) : undefined,
      },
    });
    await this.recalculateSoldes();
    const updated = await this.prisma.financeFlow.findUnique({ where: { id } });
    this.events.emit('finance:updated', { studentId: updated?.studentId, id, action: 'updated' });
    return updated;
  }

  async delete(id: number) {
    const deleted = await this.prisma.financeFlow.delete({ where: { id } });
    await this.recalculateSoldes();
    this.events.emit('finance:updated', { studentId: deleted.studentId, id, action: 'deleted' });
    return deleted;
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

  private async recalculateSoldes() {
    const flows = await this.prisma.financeFlow.findMany({ orderBy: [{ date: 'asc' }, { id: 'asc' }] });
    let running = 0;
    for (const flow of flows) {
      running += flow.credit - flow.debit;
      if (flow.solde !== running) {
        await this.prisma.financeFlow.update({ where: { id: flow.id }, data: { solde: running } });
      }
    }
  }
}
