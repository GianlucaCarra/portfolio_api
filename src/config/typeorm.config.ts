import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Project } from "src/modules/projects/entities/project.entity";
import { Image } from "src/modules/images/entities/image.entity";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const url = configService.get<string>('DB_URL');

  if (!url) {
    throw new InternalServerErrorException('Database configuration variables are not set properly');
  }

  return {
    type: "postgres",
    url,
    entities: [Project, Tag, Image],
    ssl: {
      rejectUnauthorized: false,
    },
    // autoLoadEntities: true,
  }
}