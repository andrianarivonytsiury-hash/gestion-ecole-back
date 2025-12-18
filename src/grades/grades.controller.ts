import { Body, Controller, Get, Post, Query } from '@nestjs/common'; // Décorateurs Nest pour contrôleur/routes.
import { IsInt, IsNumber, IsString } from 'class-validator'; // Validations DTO.
import { GradesService } from './grades.service'; // Service des notes.

class CreateGradeDto {
  @IsInt() // Élève concerné.
  studentId!: number;

  @IsInt() // Cours concerné.
  courseId!: number;

  @IsNumber() // Valeur numérique.
  valeur!: number;

  @IsString() // Type d'évaluation.
  typeEval!: string;

  @IsNumber() // Coefficient.
  coeff!: number;

  @IsInt() // Auteur de la saisie.
  createdBy!: number;
}

@Controller('grades') // Préfixe /grades.
export class GradesController {
  constructor(private readonly gradesService: GradesService) {} // Injection du service.

  @Get() // GET /grades?studentId=...
  list(@Query('studentId') studentId: string) {
    return this.gradesService.byStudent(Number(studentId)); // Liste des notes d'un élève.
  }

  @Post() // POST /grades
  create(@Body() payload: CreateGradeDto) {
    return this.gradesService.create(payload); // Crée une note.
  }
}
