import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PaymentRequest {
  studentId: number;
  amount: number;
  currency?: string;
  method?: string;
}

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  createCheckout(payload: PaymentRequest) {
    return this.prisma.payment.create({
      data: {
        studentId: payload.studentId,
        amount: payload.amount,
        currency: payload.currency || 'EUR',
        method: payload.method || 'card',
        status: 'requires_action',
        stripePiId: '',
      },
    });
  }

  list() {
    return this.prisma.payment.findMany({ include: { student: true } });
  }
}
