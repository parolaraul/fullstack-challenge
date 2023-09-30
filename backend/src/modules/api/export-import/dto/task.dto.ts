import { TaskStatesEnum } from '../enums/task-states.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bookId: string;

  state: TaskStatesEnum = TaskStatesEnum.Pending;
  created_at: Date = new Date();
  updated_at?: Date;
}

export type TaskStateMap = Partial<{ [state in TaskStatesEnum]: TaskDto[] }>;
