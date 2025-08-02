import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createProject } from './dtos/createProject';
import { Project } from './entities/project.entity';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';

@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        dest: './uploads',
      },
    ),
  )
  async create(
    @Body() body: createProject,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ): Promise<Project> {
    return this.appService.createProject(body, files);
  }


  @Get()
  async findAll(): Promise<Project[]> {
    return this.appService.getAllProjects();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.appService.getProjectById(+id);
  }
}
