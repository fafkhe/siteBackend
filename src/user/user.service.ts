import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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
}
