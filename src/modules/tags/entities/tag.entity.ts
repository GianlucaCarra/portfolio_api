import { Exclude } from 'class-transformer';
import { Project } from '../../../modules/projects/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.tags)
  @Exclude()
  projects: Project[];
}
