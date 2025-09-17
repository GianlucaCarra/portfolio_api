import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectTag } from '../project-tags/entities/project-tag.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) 
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectTag) 
    private tagRepository: Repository<ProjectTag>,
  ) {}

  async create(projectData: CreateProjectDto): Promise<Project> {
    const tags = await Promise.all((projectData.tags || []).map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });

        if (!tag) {
          tag = this.tagRepository.create({ name });
          await this.tagRepository.save(tag);
        }

        return tag;
      })
    );

    const newProject = this.projectRepository.create({
      ...projectData,
      tags,
    });

    try {
      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Failed to create project');
    }
  }

  async update(id: number, projectData: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!project) {
      throw new NotFoundException('Project with this ID not found');
    }

    Object.assign(project, projectData);

    if (projectData.tags) {
      const tags = await Promise.all(
        projectData.tags.map(async (tagName) => {
          let tag = await this.tagRepository.findOne({ where: { name: tagName } });
          if (!tag) {
            tag = this.tagRepository.create({ name: tagName });
            await this.tagRepository.save(tag);
          }
          return tag;
        }),
      );

      project.tags = tags;
    }

    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find();

    return projects;
  }

  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ 
      where: { id },
      relations: ['tags'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: number): Promise<number> {
    const project = await this.findById(id);

    try {
      await this.projectRepository.remove(project);

      return project.id;
    } catch (error) {
      throw new BadRequestException('Failed to remove project');
    }
  }
}
