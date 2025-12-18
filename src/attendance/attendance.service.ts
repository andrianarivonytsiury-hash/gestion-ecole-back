import { Injectable } from '@nestjs/common'; // Décorateur qui rend la classe injectable.
import { PrismaService } from '../prisma/prisma.service'; // Service Prisma pour accéder à la base.

export type AttendanceStatus = 'present' | 'absent' | 'retard' | 'excused'; // Types autorisés de statut.

interface BulkAttendanceDto {
  courseId: number; // Identifiant du cours concerné.
  records: Array<{ studentId: number; status: AttendanceStatus; motif?: string }>; // Liste des présences à créer.
}

@Injectable() // Marque la classe pour l'injection Nest.
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {} // Injecte Prisma via le constructeur.

  byCourse(courseId: number) {
    return this.prisma.attendance.findMany({
      where: { courseId }, // Filtre par cours.
      include: { student: true }, // Inclut les infos élève liées.
    });
  }

  async bulkMark(payload: BulkAttendanceDto) {
    const created = await this.prisma.attendance.createMany({
      data: payload.records.map((record) => ({
        courseId: payload.courseId, // Associe au cours.
        studentId: record.studentId, // Associe à l'élève.
        status: record.status, // Statut de présence.
        motif: record.motif, // Motif optionnel.
        notifiedAt: record.status === 'absent' || record.status === 'retard' ? new Date() : undefined, // Horodatage si besoin.
      })),
    });
    return { inserted: created.count }; // Retourne le nombre de lignes insérées.
  }
}
