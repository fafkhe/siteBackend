import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProject } from './dtos/createProject';
import { Project } from './entities/project.entity';
import { updateProjectDto } from './dtos/updateProject.dto';
import { Model } from 'mongoose';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(createProductDto: createProject) {
    try {
      const project = this.projectRepository.create(createProductDto);
      return await this.projectRepository.save(project);
    } catch (error) {
      console.log(error, 'error');
      return {
        message: 'error',
      };
    }
  }

  async update(id: number, dto: updateProjectDto) {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      if (project) {
        project.name = dto.name;
        project.description = dto.description;
        project.time = dto.time;
        project.photos = dto.photos;
        project.logo = dto.logo;
      }

      await this.projectRepository.save(project);

      return {
        statusCode: 201,
        msg: 'updated successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        msg: 'internal server error',
      };
    }
  }

  async remove(id: string) {
    try {
      await this.projectRepository.delete(id);
      return {
        statusCode: 201,
        msg: 'deleted successfully',
      };
    } catch (error) {
      console.log(error, 'erroooorrr');
      return {
        statusCode: 500,
        msg: 'internal server error',
      };
    }
  }

  async getAllProjects() {
    return await this.projectRepository.find();
  }

  async handleFileUpload(file: Express.Multer.File): Promise<any> {
    return {
      message: '',
      statusCode: 200,
      data: `${process.env.UPLOAD_BASE_URL}/${file.filename}`,
    };
  }
  async handleMultipleFilesUpload(files: Express.Multer.File[]): Promise<any> {
    return {
      message: '',
      statusCode: 200,
      data: files.map(
        (file) => `${process.env.UPLOAD_BASE_URL}/${file.filename}`,
      ),
    };
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
