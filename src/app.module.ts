import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Project } from './entities/project.entity';
import AppDataSource from './datasource';


config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin!@#$%',
      database: 'test',
      entities: [Project],
      migrations: ['./projects/**/migrations/**.js'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
