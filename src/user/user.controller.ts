import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { createProject } from 'src/dtos/createProject';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.usersService.register(body);
  }
}
