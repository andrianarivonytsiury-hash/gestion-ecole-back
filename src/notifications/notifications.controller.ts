import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationRecord, NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(): NotificationRecord[] {
    return this.notificationsService.list();
  }

  @Post()
  send(@Body() payload: Omit<NotificationRecord, 'id' | 'status' | 'sentAt'>) {
    return this.notificationsService.send(payload);
  }
}
