import { EntityRepository, Repository } from 'typeorm';
import { CreateTagDTO } from './create-tag.dto';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async createTag(createTagDTO: CreateTagDTO): Promise<Tag> {
    const tag = new Tag();
    tag.name = createTagDTO.name;

    await tag.save();
    return tag;
  }
}
