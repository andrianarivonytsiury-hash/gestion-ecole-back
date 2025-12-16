import { Global, Module } from '@nestjs/common'; // Global pour rendre Prisma accessible partout.
import { PrismaService } from './prisma.service'; // Service qui encapsule le client Prisma.

@Global() // Rend le module et ses providers disponibles sans réimport explicite.
@Module({
  providers: [PrismaService], // Fournit PrismaService à l'injection Nest.
  exports: [PrismaService], // Exporte le service pour les autres modules.
})
export class PrismaModule {}
