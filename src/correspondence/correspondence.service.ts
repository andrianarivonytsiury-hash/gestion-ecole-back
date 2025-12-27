import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CorrespondenceService {
  constructor(private readonly prisma: PrismaService) {}

  byStudent(studentId?: number) {
    return this.prisma.correspondence.findMany({
      where: studentId && !Number.isNaN(studentId) ? { studentId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  add(payload: { studentId: number; fromRole: string; message: string; attachment?: string }) {
    return this.prisma.correspondence.create({ data: payload });
  }
}
