import { Topic } from 'src/topic/topic.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  constructor(name?: string) {
    super();
    this.name = name;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => Topic,
    topic => topic.tags,
  )
  topics: Topic[];
}
