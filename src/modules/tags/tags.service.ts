import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(tag: CreateTagDto): Promise<Tag> {
    const tagExists = await this.tagRepository.findOne({
      where: { name: tag.name },
    });

    if (tagExists) {
      return tagExists;
    }

    const newTag = this.tagRepository.create(tag);

    try {
      return await this.tagRepository.save(newTag);
    } catch (error) {
      throw new BadRequestException('Failed to create tag');
    }
  }

  async update(data: UpdateTagDto): Promise<Tag> {
    try {
      const tagExists = await this.tagRepository.findOne({
        where: { name: data.name },
      });

      if (!tagExists) {
        if (!data.name) {
          throw new BadRequestException();
        }

        return await this.create({ name: data.name });
      }

      return tagExists;
    } catch (error) {
      throw new BadRequestException('Failed to update tag');
    }
  }

  async findOrCreateByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    const newTag = this.tagRepository.create({ name });
    return await this.tagRepository.save(newTag);
  }

  async remove(id: number): Promise<number> {
    const tag = await this.tagRepository.findOne({ where: { id: id } });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    try {
      return (await this.tagRepository.remove(tag)).id;
    } catch (error) {
      throw new BadRequestException('Failed to remove tag');
    }
  }
}
