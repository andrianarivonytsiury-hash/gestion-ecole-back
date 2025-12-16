import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany({
      include: { class: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { class: true },
    });
  }

  create(payload: { matricule: string; firstName: string; lastName: string; classId: number; dossierUrl?: string }) {
    return this.prisma.student.create({ data: payload });
  }
}
