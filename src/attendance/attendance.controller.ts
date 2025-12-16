import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import type { AttendanceStatus } from './attendance.service';
import { AttendanceService } from './attendance.service';

class AttendanceRecordDto {
  @IsInt()
  studentId!: number;

  @IsEnum(['present', 'absent', 'retard', 'excused'])
  status!: AttendanceStatus;

  @IsOptional()
  @IsString()
  motif?: string;
}

class BulkAttendanceDto {
  @IsInt()
  courseId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records!: AttendanceRecordDto[];
}

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  byCourse(@Query('courseId') courseId: string) {
    return this.attendanceService.byCourse(Number(courseId));
  }

  @Post('bulk')
  bulk(@Body() payload: BulkAttendanceDto) {
    return this.attendanceService.bulkMark(payload);
  }
}
