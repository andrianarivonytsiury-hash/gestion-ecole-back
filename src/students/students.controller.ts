import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

class UpdateStudentDto {
  @IsOptional()
  @IsString()
  matricule?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsInt()
  classId?: number;

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateStudentDto) {
    return this.studentsService.update({ id: Number(id), ...payload });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.delete(Number(id));
  }
}
