import { Body, Controller, Get, Post } from '@nestjs/common';
import type { PaymentRequest } from './payments.service';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  create(@Body() payload: PaymentRequest) {
    return this.paymentsService.createCheckout(payload);
  }

  @Get()
  list() {
    return this.paymentsService.list();
  }
}
