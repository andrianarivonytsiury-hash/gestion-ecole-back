import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id/details')
  details(@Param('id') id: string) {
    return this.studentsService.details(Number(id));
  }

  @Post()
  create(@Body() payload: CreateStudentDto) {
    return this.studentsService.create(payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.delete(Number(id));
  }
}
