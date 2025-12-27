import { Controller, Get } from '@nestjs/common';
import { TimetableService, TimetableRecord } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  list(): TimetableRecord[] {
    return this.timetableService.list();
  }
}
