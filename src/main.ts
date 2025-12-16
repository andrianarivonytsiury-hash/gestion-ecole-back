import { NestFactory } from '@nestjs/core'; // Importe la fabrique Nest pour créer l'application.
import { AppModule } from './app.module'; // Module racine qui agrège tous les modules métiers.
import { ValidationPipe } from '@nestjs/common'; // Pipe global pour valider/transformer les DTO.

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crée l'instance Nest à partir de AppModule.
  app.enableCors(); // Active CORS pour permettre au front (port différent) d'appeler l'API.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime silencieusement les propriétés non définies dans les DTO.
      transform: true, // Convertit automatiquement les payloads en types attendus (ex: string -> number).
      forbidUnknownValues: true, // Rejette les payloads globaux non conformes.
    }),
  );
  await app.listen(process.env.PORT ?? 3000); // Lance le serveur HTTP sur PORT ou 3000 par défaut.
}
bootstrap(); // Démarre l'application.
