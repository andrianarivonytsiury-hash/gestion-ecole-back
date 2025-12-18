import { Module } from '@nestjs/common'; // Décorateur module Nest.
import { CalendarController } from './calendar.controller'; // Contrôleur calendrier.
import { CalendarService } from './calendar.service'; // Service calendrier.

@Module({
  controllers: [CalendarController], // Routes exposées.
  providers: [CalendarService], // Service injecté.
})
export class CalendarModule {} // Déclare le module Calendar.
