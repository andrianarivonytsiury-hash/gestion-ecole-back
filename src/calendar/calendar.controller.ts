import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'; // Décorateurs Nest pour routes et accès aux params/body.
import { IsDateString, IsString } from 'class-validator'; // Validations de types simples.
import { CalendarService } from './calendar.service'; // Service métier du calendrier.

class HolidayDto {
  @IsString() // Libellé en texte.
  label!: string;

  @IsDateString() // Date ISO pour début.
  startDate!: string;

  @IsDateString() // Date ISO pour fin.
  endDate!: string;

  @IsString() // Type de congé (holiday/pause...).
  type!: string;
}

@Controller('calendar') // Préfixe de route /calendar.
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {} // Injection du service.

  @Get('holidays') // GET /calendar/holidays
  list() {
    return this.calendarService.list(); // Retourne la liste triée.
  }

  @Post('holidays') // POST /calendar/holidays
  add(@Body() payload: HolidayDto) {
    return this.calendarService.add(payload); // Crée un congé.
  }

  @Delete('holidays/:id') // DELETE /calendar/holidays/:id
  remove(@Param('id') id: string) {
    return this.calendarService.remove(Number(id)); // Supprime par id.
  }
}
