import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Project } from './project/entities/project.entity';
import { JwtModule } from '@nestjs/jwt';
import { NewUserModule } from './user/user.module';
import { jwtConstants } from './user/constants';
import { User } from './user/entities/user.entity';
import { ProjectModule } from './project/project.module';

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
      entities: [Project, User],
      migrations: [
        './projects/**/migrations/**.js',
        './users/**/migrations/**.js',
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Project, User]),
    NewUserModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
