import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  list() {
    return this.prisma.timetable.findMany({
      include: { course: true, class: true },
      orderBy: { start: 'asc' },
    });
  }

  async create(payload: { start: string; end: string; room: string; status: string; classId: number; courseId: number }) {
    const slot = await this.prisma.timetable.create({
      data: {
        ...payload,
        start: new Date(payload.start),
        end: new Date(payload.end),
      },
      include: { course: true, class: true },
    });
    this.events.emit('timetable:updated', { id: slot.id, action: 'created' });
    return slot;
  }

  async update(
    id: number,
    payload: Partial<{ start: string; end: string; room: string; status: string; classId: number; courseId: number }>,
  ) {
    const slot = await this.prisma.timetable.update({
      where: { id },
      data: {
        ...payload,
        start: payload.start ? new Date(payload.start) : undefined,
        end: payload.end ? new Date(payload.end) : undefined,
      },
      include: { course: true, class: true },
    });
    this.events.emit('timetable:updated', { id: slot.id, action: 'updated' });
    return slot;
  }

  async delete(id: number) {
    const slot = await this.prisma.timetable.delete({ where: { id } });
    this.events.emit('timetable:updated', { id: slot.id, action: 'deleted' });
    return slot;
  }
}
