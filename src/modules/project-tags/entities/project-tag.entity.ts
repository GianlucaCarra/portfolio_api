import { Project } from "src/modules/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.tags, {
    onDelete: 'CASCADE',
  })
  projects: ProjectTag[];
}