import { Module } from '@nestjs/common'; // Décorateur module.
import { JwtModule } from '@nestjs/jwt'; // Module JWT pour signer/valider les tokens.
import { AuthController } from './auth.controller'; // Contrôleur auth.
import { AuthService } from './auth.service'; // Service auth.
import { UsersModule } from '../users/users.module'; // Module users (dépendance).

@Module({
  imports: [
    UsersModule, // Permet d'accéder au service Users si besoin.
    JwtModule.register({
      global: true, // Rend JwtService global.
      secret: process.env.JWT_SECRET || 'dev-secret', // Secret de signature (à surcharger en prod).
      signOptions: { expiresIn: '1h' }, // Durée de vie par défaut des tokens.
    }),
  ],
  controllers: [AuthController], // Routes d'authentification.
  providers: [AuthService], // Service injectable.
})
export class AuthModule {} // Module auth.
