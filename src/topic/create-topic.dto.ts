import { IsString, IsArray, IsDateString } from 'class-validator';

export class CreateTopicDTO {
  @IsString()
  name: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsArray()
  tags: string[];
}
