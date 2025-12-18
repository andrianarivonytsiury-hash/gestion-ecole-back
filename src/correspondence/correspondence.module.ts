import { Module } from '@nestjs/common'; // Décorateur module.
import { CorrespondenceController } from './correspondence.controller'; // Contrôleur correspondance.
import { CorrespondenceService } from './correspondence.service'; // Service correspondance.

@Module({
  controllers: [CorrespondenceController], // Routes correspondance.
  providers: [CorrespondenceService], // Service injectable.
})
export class CorrespondenceModule {} // Module correspondance.
