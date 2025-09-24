import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Project } from "src/modules/projects/entities/project.entity";
import { Image } from "src/modules/images/entities/image.entity";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const host = configService.get<string>('HOST');
  const port = configService.get<string>('PORT');
  const user = configService.get<string>('USER');
  const password = configService.get<string>('PASSWORD');
  const database = configService.get<string>('DATABASE');

  if (!host || !port || !user || !password || !database) {
    throw new InternalServerErrorException('Database configuration variables are not set properly');
  }

  return {
    type: "postgres",
    host: host,
    port: parseInt(port || "5432"),
    username: user,
    password: password,
    database: database,
    entities: [Project, Tag, Image],
  }
}