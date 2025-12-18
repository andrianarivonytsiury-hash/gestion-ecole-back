import { Module } from '@nestjs/common'; // Décorateur module.
import { UsersController } from './users.controller'; // Contrôleur utilisateurs.
import { UsersService } from './users.service'; // Service utilisateurs.

@Module({
  controllers: [UsersController], // Routes exposées.
  providers: [UsersService], // Service injecté.
  exports: [UsersService], // Export pour utilisation dans d'autres modules.
})
export class UsersModule {} // Module users.
