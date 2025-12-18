import { Module } from '@nestjs/common'; // Décorateur module Nest.
import { AttendanceController } from './attendance.controller'; // Contrôleur de présences.
import { AttendanceService } from './attendance.service'; // Service de présences.

@Module({
  controllers: [AttendanceController], // Routes exposées.
  providers: [AttendanceService], // Services injectables.
})
export class AttendanceModule {} // Déclare le module Attendance.
