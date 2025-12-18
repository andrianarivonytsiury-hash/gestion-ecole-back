import { Injectable } from '@nestjs/common'; // Décorateur injectable.
import { PrismaService } from '../prisma/prisma.service'; // Accès base via Prisma.

@Injectable() // Rend le service injectable.
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {} // Injecte Prisma.

  findAll() {
    return this.prisma.course.findMany({ include: { class: true, teacher: true } }); // Récupère tous les cours avec classe + professeur.
  }

  findByClass(classId: number) {
    return this.prisma.course.findMany({ where: { classId }, include: { class: true, teacher: true } }); // Filtre par classe.
  }
}
