import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { FinanceService } from './finance.service';

class CreateFinanceDto {
  @IsDateString()
  date!: string;

  @IsString()
  reference!: string;

  @IsString()
  libelle!: string;

  @IsNumber()
  debit!: number;

  @IsNumber()
  credit!: number;

  @IsOptional()
  @IsNumber()
  studentId?: number;

  @IsOptional()
  @IsString()
  moyen?: string;

  @IsOptional()
  @IsString()
  statut?: string;
}

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('flows')
  list() {
    return this.financeService.list();
  }

  @Post('flows')
  create(@Body() payload: CreateFinanceDto) {
    return this.financeService.create(payload);
  }

  @Get('stats/monthly')
  monthly() {
    return this.financeService.monthlyStats();
  }
}
