import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSuperDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  secret: string;
}
