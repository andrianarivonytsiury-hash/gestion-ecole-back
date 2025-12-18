import { Module } from '@nestjs/common'; // Décorateur module.
import { NotificationsController } from './notifications.controller'; // Contrôleur notifications.
import { NotificationsService } from './notifications.service'; // Service notifications.

@Module({
  controllers: [NotificationsController], // Routes exposées.
  providers: [NotificationsService], // Service injectable.
})
export class NotificationsModule {} // Module notifications.
