import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class createProject {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}
