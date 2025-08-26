import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Project } from 'src/entities/project.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { NewUserModule } from './new-user/new-user.module';
import { jwtConstants } from './new-user/constants';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin!@#$%',
      database: 'test',
      entities: [Project,User],
      migrations: ['./projects/**/migrations/**.js','./users/**/migrations/**.js'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Project,User]),
    NewUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
