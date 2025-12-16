import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async validateUser(payload: LoginPayload) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(payload.password, user.hash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(payload: LoginPayload) {
    const user = await this.validateUser(payload);
    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      expiresIn: 3600,
    };
  }
}
