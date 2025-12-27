import { Injectable } from '@nestjs/common';

export interface TimetableRecord {
  id: number;
  class: string;
  course: string;
  start: string;
  end: string;
  room: string;
  status: string;
}

@Injectable()
export class TimetableService {
  private slots: TimetableRecord[] = [
    { id: 1, class: '6eme A', course: 'Mathematiques - Algebre', start: '08:00', end: '09:30', room: 'Salle 101', status: 'prevu' },
    { id: 2, class: 'Terminale S', course: 'Physique - Optique', start: '10:30', end: '12:00', room: 'Lab 1', status: 'prevu' },
  ];

  list(): TimetableRecord[] {
    return this.slots;
  }
}
