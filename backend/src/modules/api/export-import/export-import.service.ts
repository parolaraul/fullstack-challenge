import { Injectable, Logger } from '@nestjs/common';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { ExportTypeEnum } from './enums/export-type.enum';
import { TaskDto, TaskStateMap } from './dto/task.dto';
import { TaskStatesEnum } from './enums/task-states.enum';

@Injectable()
export class ExportImportService {
  private readonly logger = new Logger(ExportImportService.name);

  private exports: { [bookId: string]: ExportDto } = {};
  private imports: { [bookId: string]: ImportDto } = {};

  createExport(exportRequest: ExportDto): ExportDto {
    this.logger.log('creating export ' + JSON.stringify(exportRequest));
    this.exports[exportRequest.bookId] = exportRequest;
    this.executeExport(exportRequest).then((task) => {
      task.state = TaskStatesEnum.Finished;
      task.updated_at = new Date();
      this.exports[task.bookId] = task;
      this.logger.log('export task updated with id: ' + task.bookId);
      this.logger.log(JSON.stringify(this.exports));
    });
    this.logger.log(
      'export request created and scheduled for processing',
      exportRequest.bookId,
    );
    return exportRequest;
  }

  getAllExports(): TaskStateMap {
    this.logger.log('getting all exports');
    return ExportImportService.groupByState(this.exports);
  }

  createImport(importRequest: ImportDto): ImportDto {
    this.logger.log('creating import ' + JSON.stringify(importRequest));
    this.imports[importRequest.bookId] = importRequest;
    this.executeImport(importRequest).then((task) => {
      task.state = TaskStatesEnum.Finished;
      task.updated_at = new Date();
      this.imports[task.bookId] = task;
      this.logger.log('import task updated with id: ' + task.bookId);
    });
    this.logger.log(
      'import request created and scheduled for processing',
      importRequest.bookId,
    );
    return importRequest;
  }

  getAllImports(): TaskStateMap {
    this.logger.log('getting all imports');
    return ExportImportService.groupByState(this.imports);
  }

  private executeExport(exportRequest: ExportDto): Promise<ExportDto> {
    const duration = exportRequest.type === ExportTypeEnum.Epub ? 10000 : 25000;
    this.logger.log('starting export task with ' + duration + 'ms');
    return new Promise((resolve) =>
      setTimeout(() => {
        this.logger.log(
          'export task finished successfully with id: ' + exportRequest.bookId,
        );
        resolve(exportRequest);
      }, duration),
    );
  }

  private executeImport(importRequest: ImportDto): Promise<ImportDto> {
    const duration = 60000;
    this.logger.log('starting export task with ' + duration + 'ms');
    return new Promise((resolve) =>
      setTimeout(() => {
        this.logger.log(
          'import task finished successfully with id: ' + importRequest.bookId,
        );
        resolve(importRequest);
      }, duration),
    );
  }

  private static groupByState(tasks: { [p: string]: TaskDto }): TaskStateMap {
    return Object.values(tasks).reduce((stateGroup, task) => {
      stateGroup[task.state] = stateGroup[task.state] || [];
      stateGroup[task.state].push(task);
      return stateGroup;
    }, {});
  }
}
