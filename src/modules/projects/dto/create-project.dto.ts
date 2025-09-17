import { IsNotEmpty, IsOptional, isString, IsString, IsUrl } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  frontendUrl?: string;

  @IsOptional()
  @IsString()
  backendUrl?: string; 

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
