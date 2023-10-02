import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatesEnum } from '../enums/task-states.enum';
import { TaskKindEnum } from '../enums/task-kind.enum';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'tasks', timestamps: true })
export class Task {
  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  bookId: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    enum: [TaskStatesEnum.Pending, TaskStatesEnum.Finished],
  })
  state: string = TaskStatesEnum.Pending;

  @Prop({
    type: String,
    required: true,
    enum: [TaskKindEnum.Export, TaskKindEnum.Import],
  })
  kind: string;

  @ApiProperty()
  @Prop(String)
  type: string;

  @ApiProperty()
  @Prop(String)
  url: string;
}

export type TaskDocument = HydratedDocument<Task>;
export const TasksSchema = SchemaFactory.createForClass(Task);
