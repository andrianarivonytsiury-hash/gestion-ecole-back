import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.holiday.findMany({ orderBy: { startDate: 'asc' } });
  }

  add(payload: { label: string; startDate: string; endDate: string; type: string }) {
    return this.prisma.holiday.create({
      data: {
        label: payload.label,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        type: payload.type,
      },
    });
  }

  remove(id: number) {
    return this.prisma.holiday.delete({ where: { id } });
  }
}
