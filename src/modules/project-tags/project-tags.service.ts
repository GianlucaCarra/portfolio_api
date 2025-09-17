import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTag } from './entities/project-tag.entity';
import { CreateProjectTagDto } from './dto/create-project-tag.dto';
import { UpdateProjectTagDto } from './dto/update-project-tag.dto';

@Injectable()
export class ProjectTagsService {
  constructor(
    @InjectRepository(ProjectTag) 
    private tagRepository: Repository<ProjectTag>,
  ) {}

  async create(projectTags: CreateProjectTagDto): Promise<ProjectTag> {
    const newTag= this.tagRepository.create(projectTags);

    try {
      const tag = await this.tagRepository.save(newTag);

      return tag;
    } catch (error) {
      throw new BadRequestException('Failed to create project');
    }
  }

  async update(tagId: number, tagData: UpdateProjectTagDto): Promise<ProjectTag> {
    const tagPreload = await this.tagRepository.preload({
      id: tagId, 
      ...tagData
    });
    
    if (!tagPreload) {
      throw new NotFoundException('Tag not found');
    }

    const updatedTag = await this.tagRepository.save(tagPreload);

    return updatedTag;
  }

  async remove(tagId: number): Promise<number> {
    const tag = await this.tagRepository.findOne({ where: {id:  tagId } });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    try {
      await this.tagRepository.remove(tag);

      return tag.id;
    } catch (error) {
      throw new BadRequestException('Failed to remove tag');
    }
  }
}
