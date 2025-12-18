import { Body, Controller, Get, Post, Query } from '@nestjs/common'; // Décorateurs Nest pour définir routes et lire body/query.
import { CorrespondenceService, CorrespondenceMessage } from './correspondence.service'; // Service + type message.

@Controller('correspondence') // Préfixe /correspondence.
export class CorrespondenceController {
  constructor(private readonly correspondenceService: CorrespondenceService) {} // Injection du service.

  @Get() // GET /correspondence?studentId=...
  byStudent(@Query('studentId') studentId: string): CorrespondenceMessage[] {
    return this.correspondenceService.byStudent(Number(studentId)); // Convertit l'id et retourne les messages.
  }

  @Post() // POST /correspondence
  add(@Body() payload: Omit<CorrespondenceMessage, 'id' | 'createdAt'>) {
    return this.correspondenceService.add(payload); // Ajoute un message en mémoire.
  }
}
