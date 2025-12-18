import { Injectable } from '@nestjs/common'; // Décorateur injectable.
import { PrismaService } from '../prisma/prisma.service'; // Accès DB via Prisma.

@Injectable() // Marque la classe pour l'injection.
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {} // Injecte Prisma.

  list() {
    return this.prisma.financeFlow.findMany({ orderBy: { date: 'asc' } }); // Récupère tous les flux triés par date.
  }

  async create(payload: { date: string; reference: string; libelle: string; debit: number; credit: number; studentId?: number; moyen?: string; statut?: string }) {
    const last = await this.prisma.financeFlow.findFirst({ orderBy: { id: 'desc' } }); // Récupère le dernier flux pour calculer le solde.
    const solde = (last?.solde ?? 0) + payload.credit - payload.debit; // Nouveau solde = ancien + crédit - débit.
    return this.prisma.financeFlow.create({
      data: { ...payload, date: new Date(payload.date), solde }, // Écrit le flux avec date convertie et solde calculé.
    });
  }

  async monthlyStats() {
    const flows = await this.prisma.financeFlow.findMany(); // Récupère tous les flux.
    return flows.reduce<Record<string, { debit: number; credit: number }>>((acc, flow) => {
      const month = flow.date.toISOString().slice(0, 7); // Clé AAAA-MM.
      acc[month] = acc[month] ?? { debit: 0, credit: 0 }; // Initialise si absent.
      acc[month].debit += flow.debit; // Cumule les débits.
      acc[month].credit += flow.credit; // Cumule les crédits.
      return acc; // Retourne l'accumulateur.
    }, {});
  }
}
