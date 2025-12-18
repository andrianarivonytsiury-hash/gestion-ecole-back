import { Injectable } from '@nestjs/common'; // Décorateur injectable.
import { PrismaService } from '../prisma/prisma.service'; // Accès base via Prisma.

@Injectable() // Marque le service pour l'injection.
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {} // Injection Prisma.

  list() {
    return this.prisma.holiday.findMany({ orderBy: { startDate: 'asc' } }); // Récupère tous les congés triés par date.
  }

  add(payload: { label: string; startDate: string; endDate: string; type: string }) {
    return this.prisma.holiday.create({
      data: {
        label: payload.label, // Libellé du congé.
        startDate: new Date(payload.startDate), // Conversion string -> Date.
        endDate: new Date(payload.endDate), // Conversion string -> Date.
        type: payload.type, // Type de congé.
      },
    });
  }

  remove(id: number) {
    return this.prisma.holiday.delete({ where: { id } }); // Supprime par identifiant.
  }
}
