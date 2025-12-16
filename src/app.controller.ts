import { Controller, Get } from '@nestjs/common'; // Importe les décorateurs Nest pour un contrôleur HTTP GET.
import { AppService } from './app.service'; // Service qui fournit la réponse.

@Controller() // Contrôleur racine sans préfixe.
export class AppController {
  constructor(private readonly appService: AppService) {} // Injection du service via le constructeur.

  @Get() // Route GET sur "/".
  getHello(): string {
    return this.appService.getHello(); // Délègue au service pour renvoyer le message.
  }
}
