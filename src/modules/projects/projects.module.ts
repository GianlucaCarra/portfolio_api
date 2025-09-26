import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { TagsModule } from '../tags/tags.module';
import { ImageModule } from '../images/image.module';
import { Tag } from '../tags/entities/tag.entity';
import { Image } from '../images/entities/image.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Tag, Image]),
    TagsModule,
    ImageModule,
    JwtModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
