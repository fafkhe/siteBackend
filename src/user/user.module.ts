import { Module } from '@nestjs/common';
import { NewUserService } from './user.service';
import { NewUserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [NewUserController],
  providers: [NewUserService],
})
export class NewUserModule {}
