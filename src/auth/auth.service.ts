import { Injectable, UnauthorizedException } from '@nestjs/common'; // Injectable + exception 401.
import { JwtService } from '@nestjs/jwt'; // Service JWT pour signer les tokens.
import * as bcrypt from 'bcrypt'; // Lib de hashage pour vérifier le mot de passe.
import { PrismaService } from '../prisma/prisma.service'; // Service Prisma pour interroger la base.

interface LoginPayload {
  email: string; // Email envoyé par le client.
  password: string; // Mot de passe en clair envoyé par le client.
}

@Injectable() // Rend le service injectable par Nest.
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {} // Injecte Prisma et JWT.

  async validateUser(payload: LoginPayload) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } }); // Cherche l'utilisateur par email.
    if (!user) throw new UnauthorizedException('Invalid credentials'); // 401 si inconnu.
    const ok = await bcrypt.compare(payload.password, user.hash); // Compare le mot de passe en clair au hash stocké.
    if (!ok) throw new UnauthorizedException('Invalid credentials'); // 401 si mauvais mot de passe.
    return user; // Retourne l'utilisateur si valide.
  }

  async login(payload: LoginPayload) {
    const user = await this.validateUser(payload); // Valide l'utilisateur + mot de passe.
    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role }); // Signe un JWT avec id + rôle.
    return {
      user: { id: user.id, email: user.email, role: user.role }, // Infos utilisateur renvoyées au client.
      accessToken, // Jeton d'accès à utiliser côté client.
      expiresIn: 3600, // Durée de validité en secondes (1h).
    };
  }
}
