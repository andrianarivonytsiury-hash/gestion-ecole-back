import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  byStudent(studentId?: number) {
    return this.prisma.grade.findMany({
      where: studentId && !Number.isNaN(studentId) ? { studentId } : {},
      include: { student: true, course: true },
      orderBy: { id: 'asc' },
    });
  }

  async create(payload: { studentId: number; courseId: number; valeur: number; typeEval: string; coeff: number; createdBy: number }) {
    const grade = await this.prisma.grade.create({ data: payload });
    this.events.emit('grades:updated', { studentId: payload.studentId, id: grade.id });
    return grade;
  }
}
