import { Topic } from './topic.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTopicDTO } from './create-topic.dto';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  public async createTopic(createTopicDTO: CreateTopicDTO): Promise<Topic> {
    const { name, startAt, endAt } = createTopicDTO;
    const topic = new Topic();
    topic.name = name;
    topic.startAt = startAt;
    topic.endAt = endAt;

    await topic.save();

    return topic;
  }

  public async updateTopic(
    topic: Topic,
    createTopicDTO: CreateTopicDTO,
  ): Promise<Topic> {
    const { name, startAt, endAt } = createTopicDTO;
    topic.name = name;
    topic.startAt = startAt;
    topic.endAt = endAt;

    await topic.save();

    return topic;
  }
}
