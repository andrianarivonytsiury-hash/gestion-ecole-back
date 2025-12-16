import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { GradesService } from './grades.service';

class CreateGradeDto {
  @IsInt()
  studentId!: number;

  @IsInt()
  courseId!: number;

  @IsNumber()
  valeur!: number;

  @IsString()
  typeEval!: string;

  @IsNumber()
  coeff!: number;

  @IsInt()
  createdBy!: number;
}

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get()
  list(@Query('studentId') studentId: string) {
    return this.gradesService.byStudent(Number(studentId));
  }

  @Post()
  create(@Body() payload: CreateGradeDto) {
    return this.gradesService.create(payload);
  }
}
