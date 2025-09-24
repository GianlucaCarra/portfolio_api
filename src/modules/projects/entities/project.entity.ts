import { Image } from "src/modules/images/entities/image.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";
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

  @OneToMany(() => Image, (image) => image.project, { cascade: true })
  images?: Image[]; 

  @ManyToMany(() => Tag, (tag) => tag.projects, { cascade: true })
  @JoinTable({ name: 'project_tags' })
  tags?: Tag[];
}