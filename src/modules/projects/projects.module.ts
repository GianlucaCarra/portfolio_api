import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { ProjectTagsModule } from '../project-tags/project-tags.module';
import { ProjectTag } from '../project-tags/entities/project-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectTag]), ProjectTagsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
