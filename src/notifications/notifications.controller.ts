import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

class CreateNotificationDto {
  channel!: string;
  title?: string;
  message?: string;
  targetUserId!: number;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list() {
    return this.notificationsService.list();
  }

  @Post()
  send(@Body() payload: CreateNotificationDto) {
    return this.notificationsService.send(payload);
  }
}
