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
      message: 'Absence prevue le 10/01 pour rendez-vous medical.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      studentId: 2,
      fromRole: 'teacher',
      message: 'Controle lundi, merci de signer le carnet.',
      createdAt: new Date().toISOString(),
    },
  ];

  byStudent(studentId?: number): CorrespondenceMessage[] {
    if (!studentId || Number.isNaN(studentId)) return this.messages;
    return this.messages.filter((msg) => msg.studentId === studentId);
  }

  add(payload: Omit<CorrespondenceMessage, 'id' | 'createdAt'>) {
    const nextId = (this.messages[this.messages.length - 1]?.id || 0) + 1;
    const created: CorrespondenceMessage = { id: nextId, createdAt: new Date().toISOString(), ...payload };
    this.messages.push(created);
    return created;
  }
}
