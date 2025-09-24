import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginSuperDto } from './dto/login-super.dto';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Injectable()
export class SuperService {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  async login(data: LoginSuperDto, res: Response) {
    const isValid = this.validate(data);

    if(!isValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return await this.authService.generateToken(data, res);
  }

  private validate(data: LoginSuperDto) {
    const email = this.configService.get<string>('email') === data.email;
    const secret = this.configService.get<string>('SECRET_STRING') === data.secret;

    if(!email || !secret) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return true;
  }
}
