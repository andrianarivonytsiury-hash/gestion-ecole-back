import { Injectable } from '@nestjs/common';

export type AttendanceStatus = 'present' | 'absent' | 'retard' | 'excused';

export interface AttendanceRecord {
  id: number;
  studentId: number;
  student: string;
  courseId: number;
  status: AttendanceStatus;
  motif?: string;
}

interface BulkAttendanceDto {
  courseId: number;
  records: Array<{ studentId: number; status: AttendanceStatus; motif?: string; student?: string }>;
}

@Injectable()
export class AttendanceService {
  private records: AttendanceRecord[] = [
    { id: 1, studentId: 1, student: 'Lina Rakoto', courseId: 1, status: 'present' },
    { id: 2, studentId: 2, student: 'Noah Randrian', courseId: 1, status: 'retard', motif: 'Transport' },
    { id: 3, studentId: 3, student: 'Sarina Andry', courseId: 2, status: 'absent', motif: 'Malade' },
  ];

  byCourse(courseId?: number) {
    if (!courseId || Number.isNaN(courseId)) return this.records;
    return this.records.filter((r) => r.courseId === courseId);
  }

  bulkMark(payload: BulkAttendanceDto) {
    const startId = this.records[this.records.length - 1]?.id ?? 0;
    const newRecords: AttendanceRecord[] = payload.records.map((rec, idx) => ({
      id: startId + idx + 1,
      courseId: payload.courseId,
      studentId: rec.studentId,
      student: rec.student || `Etudiant ${rec.studentId}`,
      status: rec.status,
      motif: rec.motif,
    }));
    this.records.push(...newRecords);
    return { inserted: newRecords.length };
  }
}
