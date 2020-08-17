import { Topic } from 'src/topic/topic.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  Index,
} from 'typeorm';
import { TagRepository } from './tag.repository';

@Entity()
export class Tag extends BaseEntity {
  constructor(name?: string) {
    super();
    this.name = name;
  }
  @PrimaryGeneratedColumn()
  id: number;

  //Todo: Make it Unique
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(
    type => Topic,
    topic => topic.tags,
  )
  topics: Topic[];
}
