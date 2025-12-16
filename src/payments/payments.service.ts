import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PaymentRequest {
  studentId: number;
  amount: number;
  currency: string;
  method: 'card';
}

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCheckout(payload: PaymentRequest) {
    const created = await this.prisma.payment.create({
      data: {
        studentId: payload.studentId,
        amount: payload.amount,
        currency: payload.currency,
        method: payload.method,
        stripePiId: `pi_mock_${Date.now()}`,
        status: 'requires_action',
      },
    });
    return {
      clientSecret: `cs_test_${created.id}`,
      payment: created,
    };
  }

  list() {
    return this.prisma.payment.findMany({ include: { student: true } });
  }
}
