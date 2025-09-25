import * as dotenv from "dotenv";
import { Project } from '../modules/projects/entities/project.entity';
import { Tag } from '../modules/tags/entities/tag.entity';
import { DataSource } from 'typeorm';
import { Image } from 'src/modules/images/entities/image.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  entities: [Project, Tag, Image],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});
