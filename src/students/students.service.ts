import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  private async ensureClassExists(classId: number) {
    const exists = await this.prisma.class.count({ where: { id: classId } });
    if (!exists) {
      throw new NotFoundException(`Class with id ${classId} does not exist`);
    }
  }

  list() {
    return this.prisma.student.findMany({
      include: { class: true, guardians: true },
      orderBy: { id: 'asc' },
    });
  }

  details(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        class: true,
        guardians: true,
        attendance: true,
        payments: true,
        grades: true,
        finance: true,
        correspondence: true,
      },
    });
  }

  async create(payload: { matricule: string; firstName: string; lastName: string; classId: number; dossierUrl?: string; guardianIds?: number[] }) {
    await this.ensureClassExists(payload.classId);
    const student = await this.prisma.student.create({
      data: {
        matricule: payload.matricule,
        firstName: payload.firstName,
        lastName: payload.lastName,
        classId: payload.classId,
        dossierUrl: payload.dossierUrl,
        guardians: payload.guardianIds?.length
          ? {
              connect: payload.guardianIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { class: true, guardians: true },
    });
    this.events.emit('students:updated', { id: student.id, action: 'created' });
    return student;
  }

  async update(payload: { id: number; matricule?: string; firstName?: string; lastName?: string; classId?: number; guardianIds?: number[] }) {
    if (payload.classId !== undefined) {
      await this.ensureClassExists(payload.classId);
    }
    const student = await this.prisma.student.update({
      where: { id: payload.id },
      data: {
        matricule: payload.matricule,
        firstName: payload.firstName,
        lastName: payload.lastName,
        classId: payload.classId,
        guardians: payload.guardianIds?.length
          ? {
              set: [],
              connect: payload.guardianIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { class: true, guardians: true },
    });
    this.events.emit('students:updated', { id: student.id, action: 'updated' });
    return student;
  }

  async delete(id: number) {
    const deleted = await this.prisma.student.delete({ where: { id } });
    this.events.emit('students:updated', { id, action: 'deleted' });
    return deleted;
  }
}
