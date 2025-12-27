import { Injectable } from '@nestjs/common';

export interface NotificationRecord {
  id: number;
  title: string;
  message: string;
  channel: 'sms' | 'email' | 'push';
  status: 'sent' | 'queued';
  sentAt: string;
}

@Injectable()
export class NotificationsService {
  private notifications: NotificationRecord[] = [
    { id: 1, title: 'Absence Sarina', message: 'Parent notifie par email', channel: 'email', status: 'sent', sentAt: new Date().toISOString() },
    { id: 2, title: 'Retard Noah', message: 'SMS envoye (5 min de retard)', channel: 'sms', status: 'sent', sentAt: new Date().toISOString() },
  ];

  list(): NotificationRecord[] {
    return this.notifications;
  }

  send(payload: Omit<NotificationRecord, 'id' | 'status' | 'sentAt'>) {
    const id = (this.notifications[this.notifications.length - 1]?.id || 0) + 1;
    const record: NotificationRecord = {
      id,
      status: 'sent',
      sentAt: new Date().toISOString(),
      ...payload,
    };
    this.notifications.push(record);
    return record;
  }
}
