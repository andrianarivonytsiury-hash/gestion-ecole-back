import { Controller, Get } from '@nestjs/common'; // Décorateurs pour contrôleur et route GET.
import { ClassesService } from './classes.service'; // Service des classes.

@Controller('classes') // Préfixe /classes.
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {} // Injection du service.

  @Get() // GET /classes
  findAll() {
    return this.classesService.findAll(); // Retourne toutes les classes.
  }
}
