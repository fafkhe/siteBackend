import { IsNotEmpty, IsString ,IsArray,IsOptional, IsObject} from '@nestjs/class-validator';

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


  @IsArray()
  @IsOptional()
  photo?: { name: string; src: string }[];


  @IsObject()
  @IsOptional()
  logo?: {name:string; src:string};
}
