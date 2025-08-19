import { IsNotEmpty, IsString ,IsArray,IsOptional, IsObject} from '@nestjs/class-validator';

export class updateProjectDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  time: string;


  @IsArray()
  @IsOptional()
  photos?:string


  @IsObject()
  @IsOptional()
  logo?:string
}
