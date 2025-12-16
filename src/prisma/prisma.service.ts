import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'; // Interfaces pour les hooks de cycle de vie Nest.
import { PrismaClient } from '@prisma/client'; // Client Prisma généré à partir du schéma.

@Injectable() // Marque la classe comme service injectable.
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    if (!process.env.DATABASE_URL) {
      // Evite de planter localement si l'env manque; les requêtes échoueront tant que l'URL n'est pas définie.
      console.warn('DATABASE_URL is not set. Prisma will not connect.');
      return;
    }
    await this.$connect(); // Ouvre la connexion à la base de données.
  }

  async onModuleDestroy() {
    if (!process.env.DATABASE_URL) return; // Si aucune connexion ouverte, rien à fermer.
    await this.$disconnect(); // Ferme la connexion proprement à l'arrêt de l'app.
  }
}
