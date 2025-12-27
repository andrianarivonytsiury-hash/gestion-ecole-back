import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class CorrespondenceService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  byStudent(studentId?: number) {
    return this.prisma.correspondence.findMany({
      where: studentId && !Number.isNaN(studentId) ? { studentId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  async add(payload: { studentId: number; fromRole: string; message: string; attachment?: string }) {
    const record = await this.prisma.correspondence.create({ data: payload });
    this.events.emit('correspondence:updated', { studentId: payload.studentId, id: record.id });
    return record;
  }
}
