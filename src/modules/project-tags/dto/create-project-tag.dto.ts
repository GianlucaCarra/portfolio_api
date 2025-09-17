import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
