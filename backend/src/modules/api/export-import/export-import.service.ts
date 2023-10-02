import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { TaskDto, TaskStateMap } from './dto/task.dto';
import { ExportImportProcessor } from './export-import.processor';
import { TaskDocument } from './schemas/task.schema';
import { TaskRepository } from './schemas/task.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ExportImportService {
  private readonly logger = new Logger(ExportImportService.name);

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly exportImportProcessor: ExportImportProcessor,
  ) {}

  private static groupByState(tasks: TaskDto[]): TaskStateMap {
    return Object.values(tasks).reduce((stateGroup, task) => {
      stateGroup[task.state] = stateGroup[task.state] || [];
      stateGroup[task.state].push(task);
      return stateGroup;
    }, {});
  }

  async createExport(exportRequest: ExportDto): Promise<ExportDto> {
    this.logger.log('creating export ' + JSON.stringify(exportRequest));
    try {
      const exportTask = await this.taskRepository.create(exportRequest);
      await this.exportImportProcessor.execute(exportTask);
      this.logger.log(
        'export request created and scheduled for processing',
        exportRequest.bookId,
      );
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new BadRequestException(
          'Task with the provided bookId already exists.',
        );
      } else {
        throw error;
      }
    }
    return exportRequest;
  }

  async getAllExports(): Promise<TaskStateMap> {
    this.logger.log('getting all exports');
    const taskList: TaskDocument[] = await this.taskRepository.findAllExports();
    const exportList = taskList.map((t) =>
      plainToInstance(ExportDto, t, {
        excludeExtraneousValues: true,
      }),
    );
    return ExportImportService.groupByState(exportList);
  }

  async createImport(importRequest: ImportDto): Promise<ImportDto> {
    this.logger.log('creating import ' + JSON.stringify(importRequest));
    try {
      const importTask = await this.taskRepository.create(importRequest);
      await this.exportImportProcessor.execute(importTask);
      this.logger.log(
        'import request created and scheduled for processing',
        importRequest.bookId,
      );
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new BadRequestException(
          'Task with the provided bookId already exists.',
        );
      } else {
        throw error;
      }
    }
    return importRequest;
  }

  async getAllImports(): Promise<TaskStateMap> {
    this.logger.log('getting all imports');
    const taskList: TaskDocument[] = await this.taskRepository.findAllImports();
    const importList = taskList.map((t) =>
      plainToInstance(ImportDto, t, {
        excludeExtraneousValues: true,
      }),
    );
    return ExportImportService.groupByState(importList);
  }
}
