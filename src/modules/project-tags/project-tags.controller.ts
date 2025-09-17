import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { UpdateProjectTagDto } from './dto/update-project-tag.dto';
import { ProjectTagsService } from './project-tags.service';
import { CreateProjectTagDto } from './dto/create-project-tag.dto';

@Controller('projects')
export class ProjectTagsController {
  constructor(
    private readonly Execute: ProjectTagsService,
  ) {}

  @Post()
  async create(@Body() body: CreateProjectTagDto) {
    return this.Execute.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProjectTagDto) {
    return await this.Execute.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.Execute.remove(id);
  }
}
