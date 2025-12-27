import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.notification.findMany({ orderBy: { id: 'asc' } });
  }

  send(payload: { title?: string; message?: string; channel: string; targetUserId: number }) {
    return this.prisma.notification.create({
      data: {
        type: payload.title || 'notification',
        channel: payload.channel,
        payload: { title: payload.title, message: payload.message },
        status: 'sent',
        targetUserId: payload.targetUserId,
        sentAt: new Date(),
      },
    });
  }
}
