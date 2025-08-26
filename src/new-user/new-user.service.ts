import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/new-user.entity';

@Injectable()
export class NewUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      const existingUser = await this.userRepo.findOne({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
      if (existingUser) {
        return {
          message: 'کاربر وجود دارد',
          statusCode: 400,
          error: 'کاربر وجود دارد',
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const thisUser = this.userRepo.create({
        ...data,
        password: hashedPassword,
      });
      await this.userRepo.save(thisUser);

      return {
        message: 'ثبت نام شما کامل شد',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log('error is sending otp', error);

      return {
        message: 'مشکلی از سمت سرور به وجود آمده',
        statusCode: 500,
        error: 'خطای داخلی سیستم',
      };
    }
  }

  async login(phoneNumber: string, password: string) {
    try {

      console.log(phoneNumber , password ,"///////////console");
      
      const user = await this.userRepo.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });
      if (!user || !user.password) {
        return {
          message: 'کاربر پیدا نشد',
          statusCode: 400,
          error: 'کاربر پیدا نشد',
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          message: 'اطلاعات درست نمی‌باشد',
          statusCode: 400,
          error: 'اطلاعات درست نمی‌باشد',
        };
      }

      const payload = { sub: user.id, username: user.firstName };

      const token = await this.jwtService.signAsync(payload);

      return {
        message: 'خوش آمدید',
        statusCode: 200,
        data: token,
      };
    } catch (error) {
      console.log('Login error =>', error);
      return {
        message: 'مشکلی از سمت سرور به وجود آمده',
        statusCode: 500,
        error: 'خطای داخلی سیستم',
      };
    }
  }
}

