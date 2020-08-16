import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './topic/topic.module';
// import { Topic } from './topic/topic.entity';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), // Will auto load the configuration from ormconfig.json
    TopicModule, TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
