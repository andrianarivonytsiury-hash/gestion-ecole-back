import { Module } from '@nestjs/common'; // Décorateur module.
import { GradesController } from './grades.controller'; // Contrôleur des notes.
import { GradesService } from './grades.service'; // Service des notes.

@Module({
  controllers: [GradesController], // Routes exposées.
  providers: [GradesService], // Service injectable.
})
export class GradesModule {} // Module grades.
