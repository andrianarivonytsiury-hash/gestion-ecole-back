import { Body, Controller, Post } from '@nestjs/common'; // Décorateurs pour définir un contrôleur et lire le body.
import { IsEmail, IsString, MinLength } from 'class-validator'; // Contraintes de validation pour le DTO.
import { AuthService } from './auth.service'; // Service métier d'authentification.

class LoginDto {
  @IsEmail() // Valide que la chaîne est un email.
  email!: string; // Email de l'utilisateur.

  @IsString() // Valide que c'est une chaîne.
  @MinLength(6) // Minimum 6 caractères.
  password!: string; // Mot de passe en clair envoyé par le client.
}

@Controller('auth') // Préfixe de route: /auth.
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Injection du service d'auth.

  @Post('login') // Endpoint POST /auth/login.
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload); // Délègue au service pour valider et signer le token.
  }
}
