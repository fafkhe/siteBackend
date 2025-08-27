import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createProject } from './dtos/createProject';
import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common';
import { updateProjectDto } from './dtos/updateProject.dto';
import { UsePipes } from '@nestjs/common';  

@Controller('projects')
export class AppController {

}
