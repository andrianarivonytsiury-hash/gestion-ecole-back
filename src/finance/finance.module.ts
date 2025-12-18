import { Module } from '@nestjs/common'; // Décorateur module.
import { FinanceController } from './finance.controller'; // Contrôleur finance.
import { FinanceService } from './finance.service'; // Service finance.

@Module({
  controllers: [FinanceController], // Routes exposées.
  providers: [FinanceService], // Service injectable.
})
export class FinanceModule {} // Module finance.
