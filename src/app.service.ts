import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProject } from './dtos/createProject';
import { Project } from './project/entities/project.entity';
import { updateProjectDto } from './dtos/updateProject.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}


}
