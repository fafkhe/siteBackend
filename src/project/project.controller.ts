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
import { ProjectService } from './project.service';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Post()
  async create(@Body() body: createProjectDto) {
    return this.appService.createProject(body);
  }

  @Get()
  async findAll() {
    return this.appService.getAllProjects();
  }

  @Delete(':id')
  async remove(@Param() id: string) {
    return this.appService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appService.getProjectById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: updateProjectDto) {
    return this.appService.update(+id, body);
  }

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log('its here forrr tests' , file)
          const uploadDir = process.env.UPLOAD_DIR || 'uploads';
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          const safeName = `${file.fieldname}-${uniqueSuffix}${fileExt}`;
          cb(null, safeName);
        },
      }),
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '20971520'),
      },
      fileFilter: (req, file, cb) => {
        // const allowedTypes = (process.env.ALLOWED_TYPES || '')
        //   .split(',')
        //   .map((t) => t.trim());

        // const forbiddenExts = (process.env.FORBIDDEN_EXTENSIONS || '')
        //   .split(',')
        //   .map((ext) => ext.trim());
        const ext = extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        // if (forbiddenExts.includes(ext)) {
        //   return cb(new BadR equestException('Forbidden file extension'), false);
        // }
        // if (!allowedTypes.includes(mime)) {
        //   return cb(new BadRequestException('Unsupported file type'), false);
        // }
        cb(null, true);
      },
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: any) {
    console.log('last tessss' , files)
    return this.appService.handleMultipleFilesUpload(files);
  }


  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log('its come till here>>>' , file)
          const uploadDir = process.env.UPLOAD_DIR || 'uploads';
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          const safeName = `${file.fieldname}-${uniqueSuffix}${fileExt}`;
          cb(null, safeName);
        },
      }),
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '2097152', 10),
      },
      fileFilter: (req, file, cb) => {
        // const allowedTypes = (process.env.ALLOWED_TYPES || 'image/jpeg')
        //   .split(',')
        //   .map((t) => t.trim());
        // const forbiddenExts = (process.env.FORBIDDEN_EXTENSIONS || '')
        //   .split(',')
        //   .map((ext) => ext.trim());
        const ext = extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        // if (forbiddenExts.includes(ext)) {
        //   return cb(new BadRequestException('Forbidden file extension'), false);
        // }
        // if (!allowedTypes.includes(mime)) {
        //   return cb(new BadRequestException('Unsupported file type'), false);
        // }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    console.log('file isss>>>' , file)
    return this.appService.handleFileUpload(file);
  }
}

