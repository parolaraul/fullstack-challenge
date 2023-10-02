import { TaskStatesEnum } from '../enums/task-states.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskDocument } from '../schemas/task.schema';
import { Expose } from 'class-transformer';

export class TaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  bookId: string;

  @Expose()
  state: TaskStatesEnum = TaskStatesEnum.Pending;

  @Expose()
  createdAt: Date = new Date();

  @Expose()
  updatedAt: Date;
}

export type TaskStateMap = Partial<{
  [state in TaskStatesEnum]: TaskDocument[];
}>;
