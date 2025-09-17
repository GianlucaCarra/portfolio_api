import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly Execute: ProjectsService,
  ) {}

  @Post()
  async create(@Body() body: CreateProjectDto) {
    const project = await this.Execute.create(body);

    return {
      success: true,
      data: project,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProjectDto) {
    const project = await this.Execute.update(id, body);

    return { 
      success: true,
      data: project,
      timestamp: new Date().toISOString(),
     };
  }

  @Get()
  async findAll() {
    const projects = await this.Execute.findAll();

    return {
      success: true,
      data: projects,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const project = await this.Execute.findById(id);

    return {
      success: true,
      data: project,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.Execute.remove(id);

    return {
      success: true,
      data: id,
      timestamp: new Date().toISOString(),
    };
  }
}
