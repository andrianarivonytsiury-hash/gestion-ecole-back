import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.timetable.findMany({
      include: { course: true, class: true },
      orderBy: { start: 'asc' },
    });
  }
}
