import { Body, Controller, Get, Post, Query } from '@nestjs/common'; // Décorateurs Nest pour définir contrôleur/routes et accéder au body/query.
import { IsArray, IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator'; // Validations DTO.
import { Type } from 'class-transformer'; // Transforme les éléments du tableau en classes.
import type { AttendanceStatus } from './attendance.service'; // Type partagé avec le service.
import { AttendanceService } from './attendance.service'; // Service métier des présences.

class AttendanceRecordDto {
  @IsInt() // Valide que c'est un entier.
  studentId!: number; // Identifiant élève.

  @IsEnum(['present', 'absent', 'retard', 'excused']) // Restreint aux statuts autorisés.
  status!: AttendanceStatus; // Statut de présence.

  @IsOptional() // Champ optionnel.
  @IsString() // Doit être une chaîne si fourni.
  motif?: string; // Motif éventuel (retard/absence).
}

class BulkAttendanceDto {
  @IsInt() // Identifiant du cours.
  courseId!: number;

  @IsArray() // Tableau d'enregistrements.
  @ValidateNested({ each: true }) // Valide chaque élément comme DTO imbriqué.
  @Type(() => AttendanceRecordDto) // Instancie les éléments en AttendanceRecordDto.
  records!: AttendanceRecordDto[]; // Liste des présences à enregistrer.
}

@Controller('attendance') // Préfixe de route /attendance.
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {} // Injection du service.

  @Get() // GET /attendance?courseId=...
  byCourse(@Query('courseId') courseId: string) {
    return this.attendanceService.byCourse(Number(courseId)); // Appelle le service en convertissant l'id en nombre.
  }

  @Post('bulk') // POST /attendance/bulk
  bulk(@Body() payload: BulkAttendanceDto) {
    return this.attendanceService.bulkMark(payload); // Délègue l'écriture en base.
  }
}
