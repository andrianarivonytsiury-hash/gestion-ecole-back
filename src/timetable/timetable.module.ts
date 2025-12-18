import { Module } from '@nestjs/common'; // Décorateur module.
import { TimetableController } from './timetable.controller'; // Contrôleur emploi du temps.
import { TimetableService } from './timetable.service'; // Service emploi du temps.

@Module({
  controllers: [TimetableController], // Routes exposées.
  providers: [TimetableService], // Service injectable.
})
export class TimetableModule {} // Module timetable.
