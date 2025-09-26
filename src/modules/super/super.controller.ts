import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SuperService } from './super.service';
import { LoginSuperDto } from './dto/login-super.dto';
import type { Response } from 'express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller('super')
export class SuperController {
  constructor(
    readonly configService: ConfigService,
    readonly superService: SuperService,
  ) {}

  @Post()
  async login(
    @Body() data: LoginSuperDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const env = this.configService.get<string>('NODE_ENV') === 'development';
    const token = await this.superService.login(data);

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: !env,
      sameSite: env ? 'lax' : 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      data: data.email,
      timestamp: new Date().toISOString(),
    };
  }
}
