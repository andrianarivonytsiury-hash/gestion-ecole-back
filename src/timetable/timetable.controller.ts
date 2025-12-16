import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { TimetableService } from './timetable.service';

class UpsertTimetableDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  classId!: number;

  @IsInt()
  courseId!: number;

  @IsDateString()
  start!: string;

  @IsDateString()
  end!: string;

  @IsString()
  room!: string;

  @IsString()
  status!: string;
}

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  findByClass(@Query('classId') classId: string) {
    return this.timetableService.findByClass(Number(classId));
  }

  @Post()
  upsert(@Body() payload: UpsertTimetableDto) {
    return this.timetableService.upsert(payload);
  }
}
