import { Module } from '@nestjs/common'; // Décorateur module.
import { PaymentsController } from './payments.controller'; // Contrôleur paiements.
import { PaymentsService } from './payments.service'; // Service paiements.

@Module({
  controllers: [PaymentsController], // Routes exposées.
  providers: [PaymentsService], // Service injectable.
})
export class PaymentsModule {} // Module payments.
