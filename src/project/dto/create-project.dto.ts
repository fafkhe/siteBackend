import { IsNotEmpty, IsString ,IsArray,IsOptional, IsObject} from '@nestjs/class-validator';

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;


  @IsNotEmpty()
  @IsString()
  logo: string;


  @IsNotEmpty()
  @IsString()
  photos: string;


}
