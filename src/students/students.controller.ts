import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService, StudentRecord } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  list(): StudentRecord[] {
    return this.studentsService.list();
  }

  @Post()
  create(@Body() payload: Omit<StudentRecord, 'id'>) {
    return this.studentsService.create(payload);
  }
}
