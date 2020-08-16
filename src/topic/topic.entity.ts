import { Tag } from 'src/tag/tag.entity';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @ManyToMany(
    type => Tag,
    tag => tag.topics,
  )
  @JoinTable()
  tags: Tag[];
}
