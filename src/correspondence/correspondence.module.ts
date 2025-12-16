import { Module } from '@nestjs/common';
import { CorrespondenceController } from './correspondence.controller';
import { CorrespondenceService } from './correspondence.service';

@Module({
  controllers: [CorrespondenceController],
  providers: [CorrespondenceService]
})
export class CorrespondenceModule {}
