import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProject } from './dtos/createProject';
import { Project } from './entities/project.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(
    body: createProject,
    files: {
      photo?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ): Promise<Project> {
    const photoFile = files.photo?.[0];
    const logoFile = files.logo?.[0];

    console.log(createProject, '////// createProject');

    const photoUrl = photoFile
      ? `http://localhost:3000/uploads/${photoFile.filename}`
      : '';
    const logoUrl = logoFile
      ? `http://localhost:3000/uploads/${logoFile.filename}`
      : '';

    const projectData = {
      ...body,
      photo: photoUrl,
      logo: logoUrl,
    };

    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async getProjectById(id: number): Promise<Project> {
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
