import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type AttendanceStatus = 'present' | 'absent' | 'retard' | 'excused';

interface BulkAttendanceDto {
  courseId: number;
  records: Array<{ studentId: number; status: AttendanceStatus; motif?: string }>;
}

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  byCourse(courseId?: number) {
    return this.prisma.attendance.findMany({
      where: courseId && !Number.isNaN(courseId) ? { courseId } : {},
      include: { student: true },
      orderBy: { id: 'asc' },
    });
  }

  async bulkMark(payload: BulkAttendanceDto) {
    const created = await this.prisma.attendance.createMany({
      data: payload.records.map((record) => ({
        courseId: payload.courseId,
        studentId: record.studentId,
        status: record.status,
        motif: record.motif,
        notifiedAt: record.status === 'absent' || record.status === 'retard' ? new Date() : undefined,
      })),
    });
    return { inserted: created.count };
  }
}
