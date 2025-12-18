import { Module } from '@nestjs/common'; // Décorateur module.
import { ClassesController } from './classes.controller'; // Contrôleur des classes.
import { ClassesService } from './classes.service'; // Service des classes.

@Module({
  controllers: [ClassesController], // Routes exposées.
  providers: [ClassesService], // Service injecté.
})
export class ClassesModule {} // Module classes.
