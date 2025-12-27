import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { StudentsService } from './students.service';

class CreateStudentDto {
  @IsString()
  matricule!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsInt()
  classId!: number;

  @IsOptional()
  @IsString()
  dossierUrl?: string;

  @IsOptional()
  @IsArray()
  guardianIds?: number[];
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  list() {
    return this.studentsService.list();
  }

  @Post()
  create(@Body() payload: CreateStudentDto) {
    return this.studentsService.create(payload);
  }
}
