import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'; // Décorateurs Nest pour définir routes et lire body.
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'; // Validations DTO.
import { FinanceService } from './finance.service'; // Service finances.

class CreateFinanceDto {
  @IsDateString() // Date ISO de l'opération.
  date!: string;

  @IsString() // Référence texte.
  reference!: string;

  @IsString() // Libellé de l'opération.
  libelle!: string;

  @IsNumber() // Montant débit.
  debit!: number;

  @IsNumber() // Montant crédit.
  credit!: number;

  @IsOptional() // Éventuel élève lié.
  @IsNumber()
  studentId?: number;

  @IsOptional() // Moyen de paiement optionnel.
  @IsString()
  moyen?: string;

  @IsOptional() // Statut optionnel.
  @IsString()
  statut?: string;
}

class UpdateFinanceDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  libelle?: string;

  @IsOptional()
  @IsNumber()
  debit?: number;

  @IsOptional()
  @IsNumber()
  credit?: number;

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

@Controller('finance') // Préfixe /finance.
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {} // Injection du service.

  @Get('flows') // GET /finance/flows
  list() {
    return this.financeService.list(); // Liste des flux.
  }

  @Post('flows') // POST /finance/flows
  create(@Body() payload: CreateFinanceDto) {
    return this.financeService.create(payload); // Crée un flux.
  }

  @Put('flows/:id') // PUT /finance/flows/:id
  update(@Param('id') id: string, @Body() payload: UpdateFinanceDto) {
    return this.financeService.update(Number(id), payload); // Met à jour un flux.
  }

  @Delete('flows/:id') // DELETE /finance/flows/:id
  remove(@Param('id') id: string) {
    return this.financeService.delete(Number(id)); // Supprime un flux.
  }

  @Get('stats/monthly') // GET /finance/stats/monthly
  monthly() {
    return this.financeService.monthlyStats(); // Statistiques mensuelles.
  }
}
