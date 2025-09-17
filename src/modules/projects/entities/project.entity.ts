import { ProjectTag } from "src/modules/project-tags/entities/project-tag.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  frontendUrl?: string;

  @Column({ nullable: true })
  backendUrl?: string;

  @Column({ nullable: true })
  liveUrl?: string;

  @OneToMany(() => ProjectTag, (tag) => tag.projects, {
    cascade: true,
    eager: true,
  })
  tags?: ProjectTag[];
}