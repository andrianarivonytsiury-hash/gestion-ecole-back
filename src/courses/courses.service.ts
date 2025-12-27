import { Injectable } from '@nestjs/common';

export interface CourseRecord {
  id: number;
  class: string;
  label: string;
  start: string;
  room: string;
  status: string;
}

@Injectable()
export class CoursesService {
  private courses: CourseRecord[] = [
    { id: 1, class: '6eme A', label: 'Mathematiques - Algebre', start: '08:00', room: 'Salle 101', status: 'prevu' },
    { id: 2, class: 'Terminale S', label: 'Physique - Optique', start: '10:30', room: 'Lab 1', status: 'prevu' },
    { id: 3, class: '6eme A', label: 'Anglais - Conversation', start: '14:00', room: 'Salle 202', status: 'prevu' },
  ];

  findAll() {
    return this.courses;
  }

  findByClass(classId: number) {
    if (!Number.isFinite(classId)) return this.courses;
    return this.courses.filter((c) => c.id === classId || c.class.includes(String(classId)));
  }
}
