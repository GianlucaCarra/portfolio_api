import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ImageService } from '../images/image.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly tagService: TagsService,
    private readonly imageService: ImageService,
  ) {}

  async create(
    files: Express.Multer.File[],
    data: CreateProjectDto,
  ): Promise<Project> {
    const tags = await Promise.all(
      (data.tags || []).map(async (name) => {
        return await this.tagService.create({ name });
      }),
    );

    const images = await Promise.all(
      (files || []).map(async (file) => {
        return await this.imageService.create(file);
      }),
    );

    const newProject = this.projectRepository.create({
      ...data,
      tags,
      images: images.length > 0 ? images : undefined,
    });

    newProject.images?.forEach((image) => {
      image.project = newProject;
    });

    try {
      return await this.projectRepository.save(newProject);
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Failed to create project');
    }
  }

  async update(
    id: number,
    files: Express.Multer.File[],
    data: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const project = await this.findById(id);

      if (!project) {
        throw new NotFoundException('Project with this ID not found');
      }

      if (data.tags) {
        const newTags = await Promise.all(
          data.tags.map(async (name) => {
            return await this.tagService.findOrCreateByName(name);
          }),
        );

        project.tags = [...(project.tags ?? []), ...newTags];
        project.tags = project.tags.filter(
          (tag, index, self) =>
            index === self.findIndex((t) => t.id === tag.id),
        );
      }

      if (files) {
        const newImages = await Promise.all(
          files.map(async (file) => {
            return await this.imageService.create(file);
          }),
        );

        project.images = [...(project.images ?? []), ...newImages];
      }

      if (data.name) project.name = data.name;
      if (data.description) project.description = data.description;
      if (data.frontendUrl) project.frontendUrl = data.frontendUrl;
      if (data.backendUrl) project.backendUrl = data.backendUrl;
      if (data.liveUrl) project.liveUrl = data.liveUrl;

      return await this.projectRepository.save(project);
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Failed to update project');
    }
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      relations: { tags: true },
    });

    return projects;
  }

  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: Number(id) },
      relations: {
        tags: true,
        images: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: number): Promise<number> {
    const project = await this.findById(id);

    try {
      return (await this.projectRepository.remove(project)).id;
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Failed to remove project');
    }
  }
}
