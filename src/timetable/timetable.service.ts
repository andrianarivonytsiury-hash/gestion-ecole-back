import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService) {}

  findByClass(classId: number) {
    return this.prisma.timetable.findMany({
      where: { classId },
      include: { course: true },
      orderBy: { start: 'asc' },
    });
  }

  upsert(entry: { id?: number; classId: number; courseId: number; start: string; end: string; room: string; status: string }) {
    if (entry.id) {
      return this.prisma.timetable.update({
        where: { id: entry.id },
        data: { start: new Date(entry.start), end: new Date(entry.end), room: entry.room, status: entry.status, courseId: entry.courseId, classId: entry.classId },
      });
    }
    return this.prisma.timetable.create({
      data: { start: new Date(entry.start), end: new Date(entry.end), room: entry.room, status: entry.status, courseId: entry.courseId, classId: entry.classId },
    });
  }
}
