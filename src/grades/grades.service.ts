import { Injectable } from '@nestjs/common';

export interface GradeRecord {
  id: number;
  studentId: number;
  student?: string;
  courseId: number;
  valeur: number;
  typeEval: string;
  coeff: number;
  createdBy: number;
  updatedBy?: number;
}

@Injectable()
export class GradesService {
  private grades: GradeRecord[] = [
    { id: 1, studentId: 1, student: 'Lina Rakoto', courseId: 1, valeur: 15, typeEval: 'Devoir', coeff: 1, createdBy: 1 },
    { id: 2, studentId: 2, student: 'Noah Randrian', courseId: 1, valeur: 12, typeEval: 'Interro', coeff: 1, createdBy: 1 },
    { id: 3, studentId: 3, student: 'Sarina Andry', courseId: 2, valeur: 17, typeEval: 'Projet', coeff: 2, createdBy: 2 },
  ];

  byStudent(studentId: number) {
    if (!Number.isFinite(studentId)) return this.grades;
    return this.grades.filter((g) => g.studentId === studentId);
  }

  create(payload: Omit<GradeRecord, 'id'>) {
    const id = (this.grades[this.grades.length - 1]?.id || 0) + 1;
    const student = payload.student || `Etudiant ${payload.studentId}`;
    const grade: GradeRecord = { id, ...payload, student };
    this.grades.push(grade);
    return grade;
  }
}
