import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

export interface PaymentRequest {
  studentId: number;
  amount: number;
  currency?: string;
  method?: string;
}

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService, private readonly events: EventsGateway) {}

  async createCheckout(payload: PaymentRequest) {
    const payment = await this.prisma.payment.create({
      data: {
        studentId: payload.studentId,
        amount: payload.amount,
        currency: payload.currency || 'EUR',
        method: payload.method || 'card',
        status: 'requires_action',
        stripePiId: '',
      },
    });
    this.events.emit('payments:updated', { studentId: payload.studentId, id: payment.id });
    return payment;
  }

  list() {
    return this.prisma.payment.findMany({ include: { student: true } });
  }
}
