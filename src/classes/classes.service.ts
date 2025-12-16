import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.class.findMany({ orderBy: { id: 'asc' } });
  }
}
