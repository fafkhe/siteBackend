import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { loginDto } from 'src/dtos/createUser.dto';
import { NewUserService } from './user.service';
import { JwtAuthGuard } from '../gaurds/gaurds';

@Controller('user')
export class NewUserController {
  constructor(private readonly UserService: NewUserService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.UserService.register(body);
  }


  @Post('/login') 
  login(@Body() body: loginDto) {
    return this.UserService.login(body.phoneNumber, body.password);
  }

  // @Post()
  // create(@Body() createNewUserDto: CreateNewUserDto) {
  //   return this.UserService.create(createNewUserDto);
  // }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/disable/:id')
  async disable(@Param('id') userId: number) {
    return this.UserService.activation(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewUserDto: UpdateNewUserDto) {
  //   return this.newUserService.update(+id, updateNewUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.newUserService.remove(+id);
  // }
}
