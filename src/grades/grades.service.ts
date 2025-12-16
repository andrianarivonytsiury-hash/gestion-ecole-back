import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  byStudent(studentId: number) {
    return this.prisma.grade.findMany({
      where: { studentId },
      include: { course: true },
      orderBy: { id: 'asc' },
    });
  }

  create(payload: { studentId: number; courseId: number; valeur: number; typeEval: string; coeff: number; createdBy: number; updatedBy?: number }) {
    return this.prisma.grade.create({
      data: payload,
    });
  }
}
