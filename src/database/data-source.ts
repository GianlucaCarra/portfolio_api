import { Project } from '../modules/projects/entities/project.entity';
import { ProjectTag } from '../modules/project-tags/entities/project-tag.entity';
import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.PORT || "5432"),
  password: process.env.PASSWORD,
  username: process.env.USER,
  database: process.env.DATABASE,
  entities: [Project, ProjectTag],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
