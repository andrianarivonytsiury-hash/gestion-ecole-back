import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsInt, IsOptional, IsString } from 'class-validator';
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
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(Number(id));
  }

  @Post()
  create(@Body() payload: CreateStudentDto) {
    return this.studentsService.create(payload);
  }
}
