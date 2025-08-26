import { Module } from '@nestjs/common';
import { NewUserService } from './new-user.service';
import { NewUserController } from './new-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/new-user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [NewUserController],
  providers: [NewUserService]
})
export class NewUserModule {}
