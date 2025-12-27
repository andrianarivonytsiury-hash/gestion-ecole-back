import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CorrespondenceService } from './correspondence.service';

@Controller('correspondence')
export class CorrespondenceController {
  constructor(private readonly correspondenceService: CorrespondenceService) {}

  @Get()
  byStudent(@Query('studentId') studentId?: string) {
    return this.correspondenceService.byStudent(studentId ? Number(studentId) : undefined);
  }

  @Post()
  add(@Body() payload: { studentId: number; fromRole: string; message: string; attachment?: string }) {
    return this.correspondenceService.add(payload);
  }
}
