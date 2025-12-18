import { Body, Controller, Get, Post } from '@nestjs/common'; // Décorateurs Nest pour contrôleur/routes.
import { NotificationRecord, NotificationsService } from './notifications.service'; // Service + type notification.

@Controller('notifications') // Préfixe /notifications.
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {} // Injection du service.

  @Get() // GET /notifications
  list(): NotificationRecord[] {
    return this.notificationsService.list(); // Retourne la liste en mémoire.
  }

  @Post() // POST /notifications
  send(@Body() payload: Omit<NotificationRecord, 'id' | 'status' | 'sentAt'>) {
    return this.notificationsService.send(payload); // Ajoute une notification fictive envoyée.
  }
}
