import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDTO } from 'src/topic/create-topic.dto';
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

  public async createBatchOrUpdate(names: string[]): Promise<Tag[]> {
    if (!names.length) {
      throw new BadRequestException('No tag');
    }
    const tags = names.map((name: string) => new Tag(name));
    //Todo: Upsert
    return this.tagRepository.save(tags);
  }
}
