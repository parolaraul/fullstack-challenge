import { Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from './schemas/task.repository';
import { ExportTypeEnum } from './enums/export-type.enum';
import { TaskDocument } from './schemas/task.schema';
import { TaskStatesEnum } from './enums/task-states.enum';
import { TaskKindEnum } from './enums/task-kind.enum';

@Injectable()
export class ExportImportProcessor {
  private static TASK_EXECUTION_MS_DEFAULT = 60000;
  private static TASK_EXECUTION_MS = {
    [TaskKindEnum.Export]: {
      [ExportTypeEnum.Epub]: 10000,
      [ExportTypeEnum.Pdf]: 25000,
    },
    [TaskKindEnum.Import]: {},
  };
  private readonly logger = new Logger(ExportImportProcessor.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(task: TaskDocument): Promise<TaskDocument> {
    this.executeTask(task).then((t) => {
      t.state = TaskStatesEnum.Finished;
      this.taskRepository.update(t._id, t);
      this.logger.log('task finished and updated with id: ' + t.bookId);
    });
    return task;
  }

  private executeTask(task: TaskDocument): Promise<TaskDocument> {
    const duration =
      ExportImportProcessor.TASK_EXECUTION_MS[task.kind][task.type] ||
      ExportImportProcessor.TASK_EXECUTION_MS_DEFAULT;
    this.logger.log('starting task with ' + duration + 'ms');
    return new Promise((resolve) =>
      setTimeout(() => {
        this.logger.log('task finished successfully with id: ' + task.bookId);
        resolve(task);
      }, duration),
    );
  }
}
