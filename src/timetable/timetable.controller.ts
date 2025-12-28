import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { TimetableService } from './timetable.service';

class CreateTimetableDto {
  @IsDateString()
  start!: string;

  @IsDateString()
  end!: string;

  @IsString()
  room!: string;

  @IsString()
  status!: string;

  @IsInt()
  classId!: number;

  @IsInt()
  courseId!: number;
}

class UpdateTimetableDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;

  @IsOptional()
  @IsString()
  room?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  classId?: number;

  @IsOptional()
  @IsInt()
  courseId?: number;
}

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  list() {
    return this.timetableService.list();
  }

  @Post()
  create(@Body() payload: CreateTimetableDto) {
    return this.timetableService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTimetableDto) {
    return this.timetableService.update(Number(id), payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.delete(Number(id));
  }
}
