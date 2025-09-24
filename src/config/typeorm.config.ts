import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Project } from "src/modules/projects/entities/project.entity";
import { Image } from "src/modules/images/entities/image.entity";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const host = configService.get<string>('HOST');
  const user = configService.get<string>('USER');
  const password = configService.get<string>('PASSWORD');
  const database = configService.get<string>('DATABASE');
  const url = configService.get<string>('DB_URL');

  if (!host || !user || !password || !database) {
    throw new InternalServerErrorException('Database configuration variables are not set properly');
  }

  return {
    type: "postgres",
    url,
    // host: host,
    // port: 5432,
    // username: user,
    // password,
    // database,
    entities: [Project, Tag, Image],
    ssl: {
      rejectUnauthorized: false,
    },
    // autoLoadEntities: true,
  }
}