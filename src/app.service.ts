import { Injectable } from '@nestjs/common'; // Décorateur qui marque la classe comme injectable.

@Injectable() // Permet l'injection de dépendances.
export class AppService {
  getHello(): string {
    return 'Hello World!'; // Message de test/health-check retourné par le contrôleur.
  }
}
