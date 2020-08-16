import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class CreateTagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
