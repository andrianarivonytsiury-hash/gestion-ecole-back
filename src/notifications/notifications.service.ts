import { Injectable } from '@nestjs/common';

export type NotificationChannel = 'email' | 'sms' | 'whatsapp';
export type NotificationType = 'absence' | 'retard' | 'payment' | 'event' | 'bulletin';

export interface NotificationRecord {
  id: number;
  type: NotificationType;
  channel: NotificationChannel;
  payload: Record<string, unknown>;
  status: 'pending' | 'sent' | 'failed';
  targetUserId: number;
  sentAt?: string;
}

@Injectable()
export class NotificationsService {
  private notifications: NotificationRecord[] = [
    {
      id: 1,
      type: 'absence',
      channel: 'email',
      payload: { studentId: 1, message: 'Absence le 08/01' },
      status: 'sent',
      targetUserId: 3,
      sentAt: new Date().toISOString(),
    },
  ];

  list(): NotificationRecord[] {
    return this.notifications;
  }

  send(payload: Omit<NotificationRecord, 'id' | 'status' | 'sentAt'>) {
    const id = Math.max(...this.notifications.map((n) => n.id)) + 1;
    const record: NotificationRecord = { id, status: 'sent', sentAt: new Date().toISOString(), ...payload };
    this.notifications.push(record);
    return record;
  }
}
