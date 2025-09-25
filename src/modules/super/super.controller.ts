import { Body, Controller, Post, Res } from '@nestjs/common';
import { SuperService } from './super.service';
import { LoginSuperDto } from './dto/login-super.dto';
import type { Response } from 'express';

@Controller('super')
export class SuperController {
  constructor(readonly superService: SuperService) {}

  @Post()
  async login(@Body() data: LoginSuperDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.superService.login(data);

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      data: data.email,
      timestamp: new Date().toISOString(),
    }
  }
}
