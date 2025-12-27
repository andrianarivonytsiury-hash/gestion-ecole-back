import { Injectable } from '@nestjs/common';

export interface StudentRecord {
  id: number;
  firstName: string;
  lastName: string;
  classLabel: string;
}

@Injectable()
export class StudentsService {
  private students: StudentRecord[] = [
    { id: 1, firstName: 'Lina', lastName: 'Rakoto', classLabel: '6eme A' },
    { id: 2, firstName: 'Noah', lastName: 'Randrian', classLabel: '6eme A' },
  ];

  list() {
    return this.students;
  }

  create(payload: Omit<StudentRecord, 'id'>) {
    const id = (this.students[this.students.length - 1]?.id || 0) + 1;
    const student: StudentRecord = { id, ...payload };
    this.students.push(student);
    return student;
  }
}
