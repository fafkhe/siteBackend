import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { createProject } from './dtos/createProject';
import { UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common';

@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'photo', maxCount: 1 },
  //       { name: 'logo', maxCount: 1 },
  //     ],
  //     {
  //       dest: './uploads',
  //     },
  //   ),
  // )
  async create(
    @Body() body: createProject,
    // @UploadedFiles()
    // files: {
    //   photo?: Express.Multer.File[];
    //   logo?: Express.Multer.File[];
    // },
  ) {
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

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
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
        //   return cb(new BadRequestException('Forbidden file extension'), false);
        // }
        // if (!allowedTypes.includes(mime)) {
        //   return cb(new BadRequestException('Unsupported file type'), false);
        // }
        cb(null, true);
      },
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: any) {
    return this.appService.handleMultipleFilesUpload(files);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
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
    return this.appService.handleFileUpload(file);
  }
}
