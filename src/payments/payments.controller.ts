import { Body, Controller, Get, Post } from '@nestjs/common'; // Décorateurs Nest pour contrôleur/routes.
import type { PaymentRequest } from './payments.service'; // Type pour la requête de paiement.
import { PaymentsService } from './payments.service'; // Service des paiements.

@Controller('payments') // Préfixe /payments.
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {} // Injection du service.

  @Post('checkout') // POST /payments/checkout
  create(@Body() payload: PaymentRequest) {
    return this.paymentsService.createCheckout(payload); // Crée un paiement mock.
  }

  @Get() // GET /payments
  list() {
    return this.paymentsService.list(); // Liste des paiements en base.
  }
}
