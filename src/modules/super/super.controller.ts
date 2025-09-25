import { Body, Controller, Post, Res } from '@nestjs/common';
import { SuperService } from './super.service';
import { LoginSuperDto } from './dto/login-super.dto';
import type { Response } from 'express';

@Controller('super')
export class SuperController {
  constructor(readonly superService: SuperService) {}

  @Post()
  async login(@Body() data: LoginSuperDto, @Res() res: Response) {
    const token = await this.superService.login(data, res);

    return {
      success: true,
      data: token,
      timestamp: new Date().toISOString(),
    }
  }
}
