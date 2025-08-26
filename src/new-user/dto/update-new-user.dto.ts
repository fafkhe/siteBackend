import { PartialType } from '@nestjs/mapped-types';
import { CreateNewUserDto } from './create-new-user.dto';

export class UpdateNewUserDto extends PartialType(CreateNewUserDto) {}
