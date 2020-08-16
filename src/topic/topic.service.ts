import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TopicRepository } from './topic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDTO } from './create-topic.dto';
import { Topic } from './topic.entity';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepository: TopicRepository,
    // @Inject(forwardRef(() => TagService))
    @Inject(TagService)
    private tagService: TagService, // @InjectRepository(TagService)
  ) {}

  public async createTopic(createTopicDTO: CreateTopicDTO): Promise<Topic> {
    console.log(createTopicDTO.tags);
    //Todo: Save topic once if standard
    const topic = await this.topicRepository.createTopic(createTopicDTO);
    if (createTopicDTO.tags.length) {
      const tags = await this.tagService.createBatchOrUpdate(
        createTopicDTO.tags,
      );
      (topic.tags || []).push(...tags);
      await topic.save();
    }
    return topic;
  }

  public async updateTopic(
    topicId: number,
    createTopicDTO: CreateTopicDTO,
  ): Promise<Topic> {
    const topic = await this.topicRepository.findOne(topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }
    return await this.topicRepository.updateTopic(topic, createTopicDTO);
  }

  public async getTopics(): Promise<Topic[]> {
    //Todo: Add pagination later
    return await this.topicRepository.find();
  }

  public async getTopic(topicId: number): Promise<Topic> {
    const topic = await this.topicRepository.findOne(topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }
    return topic;
  }

  public async deleteTopic(topicId: number): Promise<void> {
    await this.topicRepository.delete(topicId);
  }
}
