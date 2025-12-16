import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CorrespondenceService, CorrespondenceMessage } from './correspondence.service';

@Controller('correspondence')
export class CorrespondenceController {
  constructor(private readonly correspondenceService: CorrespondenceService) {}

  @Get()
  byStudent(@Query('studentId') studentId: string): CorrespondenceMessage[] {
    return this.correspondenceService.byStudent(Number(studentId));
  }

  @Post()
  add(@Body() payload: Omit<CorrespondenceMessage, 'id' | 'createdAt'>) {
    return this.correspondenceService.add(payload);
  }
}
