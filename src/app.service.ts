import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProject } from './dtos/createProject';
import { Project } from './entities/project.entity';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(
    body: createProject,
    // files: {
    //   photo?: Express.Multer.File[];
    //   logo?: Express.Multer.File[];
    // },
  ) {
    // const photoFile = files.photo?.[0];
    // const logoFile = files.logo?.[0];

    console.log(createProject, '////// createProject');

    // const photoUrl = photoFile
    //   ? `http://localhost:3000/uploads/${photoFile.filename}`
    //   : '';
    // const logoUrl = logoFile
    //   ? `http://localhost:3000/uploads/${logoFile.filename}`
    //   : '';

    const projectData = {
      ...body,
      // photo: photoUrl,
      // logo: logoUrl,
    };

    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project);
  }

  async getAllProjects() {
    return await this.projectRepository.find();
  }


  

  async handleFileUpload(file: Express.Multer.File): Promise<any> {

     return {
        message: '',
        statusCode: 200,
        data:`${process.env.UPLOAD_BASE_URL}/${file.filename}`
      }
  }
    async handleMultipleFilesUpload(files: Express.Multer.File[]): Promise<any> { 
     return {
        message: '',  
        statusCode: 200,
        data: files.map(file => `${process.env.UPLOAD_BASE_URL}/${file.filename}`)
      }
  }

  async deleteFile(filePath: string) {
    const fullPath = join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async getProjectById(id: number) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    } catch (error) {
      console.log(error);
    }
  }
}
