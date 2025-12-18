import { Module } from '@nestjs/common'; // Décorateur module.
import { StudentsController } from './students.controller'; // Contrôleur élèves.
import { StudentsService } from './students.service'; // Service élèves.

@Module({
  controllers: [StudentsController], // Routes exposées.
  providers: [StudentsService], // Service injectable.
})
export class StudentsModule {} // Module students.
