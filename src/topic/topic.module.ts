import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TopicRepository } from './topic.repository';
// import { TagService } from 'src/tag/tag.service';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [
    // forwardRef(() => TagModule), //Circular dependency reslover
    TagModule,
    TypeOrmModule.forFeature([TopicRepository]),
  ],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [],
})
export class TopicModule {}
