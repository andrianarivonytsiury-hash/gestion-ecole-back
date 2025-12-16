import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  find(@Query('classId') classId?: string) {
    if (classId) {
      return this.coursesService.findByClass(Number(classId));
    }
    return this.coursesService.findAll();
  }
}
