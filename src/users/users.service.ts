import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student' | 'accountant';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      select: { id: true, email: true, phone: true, role: true, isActive: true, createdAt: true, updatedAt: true },
    });
  }

  async create(data: { email: string; phone?: string; role: UserRole; password: string }) {
    const hash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        role: data.role,
        hash,
      },
      select: { id: true, email: true, phone: true, role: true, isActive: true, createdAt: true },
    });
  }
}
