import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({ include: { class: true, teacher: true } });
  }

  findByClass(classId: number) {
    return this.prisma.course.findMany({ where: { classId }, include: { class: true, teacher: true } });
  }
}
