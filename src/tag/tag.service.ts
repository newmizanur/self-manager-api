import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDTO } from 'src/topic/create-topic.dto';
import { In } from 'typeorm';
import { Tag } from './tag.entity';

import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  public async create(createTagDTO: CreateTopicDTO): Promise<Tag> {
    return this.tagRepository.create(createTagDTO);
  }

  public async upsertBatch(names: string[]): Promise<Tag[]> {
    if (!names.length) {
      throw new BadRequestException('No tag');
    }
    const tags = names.map((name: string) => new Tag(name));
    await this.tagRepository
      .createQueryBuilder()
      .insert()
      .values(tags)
      .orUpdate({ conflict_target: ['id', 'name'], overwrite: ['name'] }) //Not works without overwrite
      .execute();

    return this.tagRepository.find({ where: { name: In(tags) } });
  }
}
