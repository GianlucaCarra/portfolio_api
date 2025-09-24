import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async generateToken(user: any, res: Response) {
    const payload = { sub: user.email, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '5d'
    });

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return payload.email;
  }
}
