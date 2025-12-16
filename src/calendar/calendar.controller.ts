import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IsDateString, IsString } from 'class-validator';
import { CalendarService } from './calendar.service';

class HolidayDto {
  @IsString()
  label!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsString()
  type!: string;
}

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('holidays')
  list() {
    return this.calendarService.list();
  }

  @Post('holidays')
  add(@Body() payload: HolidayDto) {
    return this.calendarService.add(payload);
  }

  @Delete('holidays/:id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(Number(id));
  }
}
