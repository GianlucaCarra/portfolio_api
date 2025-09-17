import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTagsController } from './project-tags.controller';
import { ProjectTagsService } from './project-tags.service';
import { ProjectTag } from './entities/project-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTag])],
  controllers: [ProjectTagsController],
  providers: [ProjectTagsService],
  exports: [ProjectTagsService],
})
export class ProjectTagsModule {}
