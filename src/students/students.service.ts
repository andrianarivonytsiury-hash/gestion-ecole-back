import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.student.findMany({
      include: { class: true, guardians: true },
      orderBy: { id: 'asc' },
    });
  }

  create(payload: { matricule: string; firstName: string; lastName: string; classId: number; dossierUrl?: string; guardianIds?: number[] }) {
    return this.prisma.student.create({
      data: {
        matricule: payload.matricule,
        firstName: payload.firstName,
        lastName: payload.lastName,
        classId: payload.classId,
        dossierUrl: payload.dossierUrl,
        guardians: payload.guardianIds?.length
          ? {
              connect: payload.guardianIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { class: true, guardians: true },
    });
  }
}
