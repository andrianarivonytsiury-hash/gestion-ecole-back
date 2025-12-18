import { Injectable } from '@nestjs/common'; // Décorateur injectable.
import { PrismaService } from '../prisma/prisma.service'; // Accès base.

@Injectable() // Marque le service injectable.
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {} // Injecte Prisma.

  findAll() {
    return this.prisma.class.findMany({ orderBy: { id: 'asc' } }); // Récupère toutes les classes triées par id.
  }
}
