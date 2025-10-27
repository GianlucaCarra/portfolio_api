import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { Project } from './entities/project.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly Execute: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('data') data: string,
  ) {
    const body: CreateProjectDto = JSON.parse(data);
    const project = await this.Execute.create(files, body);

    return {
      success: true,
      data: plainToInstance(Project, project),
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('data') data: string,
  ) {
    const body: UpdateProjectDto = JSON.parse(data);
    const project = await this.Execute.update(id, files, body);

    return {
      success: true,
      data: plainToInstance(Project, project),
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  async findAll() {
    const projects = await this.Execute.findAll();

    return {
      success: true,
      data: plainToInstance(Project, projects),
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const project = await this.Execute.findById(id);

    return {
      success: true,
      data: plainToInstance(Project, project),
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
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
