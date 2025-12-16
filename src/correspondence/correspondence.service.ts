import { Injectable } from '@nestjs/common';

export interface CorrespondenceMessage {
  id: number;
  studentId: number;
  fromRole: 'parent' | 'teacher' | 'admin';
  message: string;
  attachmentUrl?: string;
  createdAt: string;
}

@Injectable()
export class CorrespondenceService {
  private messages: CorrespondenceMessage[] = [
    {
      id: 1,
      studentId: 1,
      fromRole: 'parent',
      message: 'Absence prévue le 10/01 pour rendez-vous médical.',
      createdAt: new Date().toISOString(),
    },
  ];

  byStudent(studentId: number): CorrespondenceMessage[] {
    return this.messages.filter((msg) => msg.studentId === studentId);
  }

  add(payload: Omit<CorrespondenceMessage, 'id' | 'createdAt'>) {
    const nextId = Math.max(...this.messages.map((m) => m.id)) + 1;
    const created: CorrespondenceMessage = { id: nextId, createdAt: new Date().toISOString(), ...payload };
    this.messages.push(created);
    return created;
  }
}
