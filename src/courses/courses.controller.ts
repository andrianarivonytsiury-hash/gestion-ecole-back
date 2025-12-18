import { Controller, Get, Query } from '@nestjs/common'; // Décorateurs Nest pour contrôleur + lecture de query.
import { CoursesService } from './courses.service'; // Service des cours.

@Controller('courses') // Préfixe /courses.
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {} // Injection du service.

  @Get() // GET /courses
  find(@Query('classId') classId?: string) {
    if (classId) {
      return this.coursesService.findByClass(Number(classId)); // Si classId fourni, filtre.
    }
    return this.coursesService.findAll(); // Sinon, retourne tout.
  }
}
