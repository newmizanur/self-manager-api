import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDTO } from './create-topic.dto';
import { Topic } from './topic.entity';

@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  public async all(): Promise<Topic[]> {
    //Todo: Add pagination
    const topics = await this.topicService.getTopics();
    return topics;
  }

  @Post()
  public async create(@Body() createTopicDTO: CreateTopicDTO): Promise<Topic> {
    //Todo: Create response/view model to avoid input db model at controller
    const topic = await this.topicService.createTopic(createTopicDTO);
    return topic;
  }

  @Put('/:topicId')
  public async update(
    @Param('topicId') topicId: number,
    @Body() createTopicDTO: CreateTopicDTO,
  ): Promise<Topic> {
    const topic = await this.topicService.updateTopic(topicId, createTopicDTO);
    return topic;
  }

  @Get('/:topicId')
  public async get(@Param('topicId') topicId: number): Promise<Topic> {
    const topic = await this.topicService.getTopic(topicId);
    return topic;
  }

  @Delete('/:topicId')
  public async delete(@Param('topicId') topicId: number): Promise<void> {
    await this.topicService.deleteTopic(topicId);
  }
}
