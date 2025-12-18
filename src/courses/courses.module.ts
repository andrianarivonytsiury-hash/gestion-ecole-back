import { Module } from '@nestjs/common'; // Décorateur module.
import { CoursesController } from './courses.controller'; // Contrôleur des cours.
import { CoursesService } from './courses.service'; // Service des cours.

@Module({
  controllers: [CoursesController], // Routes exposées.
  providers: [CoursesService], // Service injectable.
})
export class CoursesModule {} // Module courses.
