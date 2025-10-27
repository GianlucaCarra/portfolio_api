import {
  BadRequestException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginSuperDto } from './dto/login-super.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SuperService {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  async login(data: LoginSuperDto) {
    try {
      const isValid = this.validate(data);

      if (!isValid) {
        throw new UnauthorizedException('Wrong credentials');
      }

      return this.authService.generateToken(data);
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Wrong credentials');
    }
  }

  private validate(data: LoginSuperDto) {
    const email = this.configService.get<string>('EMAIL') === data.email;
    const secret =
      this.configService.get<string>('SECRET_STRING') === data.secret;

    if (!email || !secret) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return true;
  }
}
