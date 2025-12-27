import { Injectable } from '@nestjs/common';

export interface PaymentRequest {
  student: string;
  amount: number;
  currency?: string;
  method?: string;
}

export interface PaymentRecord extends PaymentRequest {
  id: number;
  status: 'succeeded' | 'requires_action';
  receiptUrl?: string;
}

@Injectable()
export class PaymentsService {
  private payments: PaymentRecord[] = [
    { id: 1, student: 'Lina Rakoto', amount: 200, currency: 'EUR', method: 'card', status: 'succeeded' },
    { id: 2, student: 'Noah Randrian', amount: 200, currency: 'EUR', method: 'card', status: 'requires_action' },
  ];

  createCheckout(payload: PaymentRequest) {
    const id = (this.payments[this.payments.length - 1]?.id || 0) + 1;
    const record: PaymentRecord = {
      id,
      currency: payload.currency || 'EUR',
      method: payload.method || 'card',
      status: 'requires_action',
      ...payload,
    };
    this.payments.push(record);
    return record;
  }

  list(): PaymentRecord[] {
    return this.payments;
  }
}
