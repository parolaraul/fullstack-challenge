import { Test, TestingModule } from '@nestjs/testing';
import { ExportImportService } from './export-import.service';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { ExportTypeEnum } from './enums/export-type.enum';
import { TaskStatesEnum } from './enums/task-states.enum';
import { ImportTypeEnum } from './enums/import-type.enum';
import { TaskRepository } from './schemas/task.repository';
import { ExportImportProcessor } from './export-import.processor';
import { Task, TaskDocument, TasksSchema } from './schemas/task.schema';
import { model, Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { TaskStateMap } from './dto/task.dto';

describe('ExportImportService', () => {
  let service: ExportImportService;
  let taskRepository: TaskRepository;
  let exportImportProcessor: ExportImportProcessor;
  let taskModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExportImportService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn(),
            findAllExports: jest.fn(),
            findAllImports: jest.fn(),
          },
        },
        {
          provide: ExportImportProcessor,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExportImportService>(ExportImportService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    exportImportProcessor = module.get<ExportImportProcessor>(
      ExportImportProcessor,
    );
    taskModel = model<any>(Task.name, TasksSchema);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('createExport', () => {
    it('should create an export task epub and finish in time', async () => {
      jest.useFakeTimers();
      const exportDto: ExportDto = new ExportDto();
      exportDto.type = ExportTypeEnum.Epub;
      exportDto.bookId = 'unique-book-id';

      const createdExportTask = service.createExport(exportDto);

      setTimeout(() => {
        const exportTask = service.getAllExports()[TaskStatesEnum.Finished][0];
        expect(exportTask).toBeDefined();
        expect(exportTask.state).toEqual(TaskStatesEnum.Finished);

        jest.useRealTimers();
      }, 10000);
    });

    it('should create an export task pdf and finish in time', async () => {
      jest.useFakeTimers();
      const exportDto: ExportDto = new ExportDto();
      exportDto.type = ExportTypeEnum.Pdf;
      exportDto.bookId = 'unique-book-id';

      const createdExportTask = service.createExport(exportDto);

      setTimeout(() => {
        const exportTask = service.getAllExports()[TaskStatesEnum.Finished][0];
        expect(exportTask).toBeDefined();
        expect(exportTask.state).toEqual(TaskStatesEnum.Finished);

        jest.useRealTimers();
      }, 25000);
    });

    it('should create an export', async () => {
      const exportRequest: ExportDto = new ExportDto();
      const createdExportTask: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        ...exportRequest,
      });
      (taskRepository.create as jest.Mock).mockResolvedValue(createdExportTask);
      (exportImportProcessor.execute as jest.Mock).mockResolvedValue(undefined);

      await expect(service.createExport(exportRequest)).resolves.toEqual(
        exportRequest,
      );

      expect(taskRepository.create).toHaveBeenCalledWith(exportRequest);
      expect(exportImportProcessor.execute).toHaveBeenCalledWith(
        createdExportTask,
      );
    });

    it('should handle duplicate export creation', async () => {
      const exportRequest: ExportDto = new ExportDto();

      (taskRepository.create as jest.Mock).mockRejectedValue({
        code: 11000,
      });
      await expect(service.createExport(exportRequest)).rejects.toThrow(
        BadRequestException,
      );
      expect(taskRepository.create).toHaveBeenCalledWith(exportRequest);
    });
  });

  describe('getAllExports', () => {
    it('should get all exports', async () => {
      const exportRequest: ExportDto = new ExportDto();
      const createdExportTask: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        ...exportRequest,
      });
      const taskList: TaskDocument[] = [createdExportTask];
      (taskRepository.findAllExports as jest.Mock).mockResolvedValue(taskList);

      const result: TaskStateMap = await service.getAllExports();

      expect(taskRepository.findAllExports).toHaveBeenCalled();
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });

  describe('createImport', () => {
    it('should create an import task', async () => {
      jest.useFakeTimers();

      const importDto: ImportDto = new ImportDto();
      importDto.type = ImportTypeEnum.Pdf;
      importDto.bookId = 'unique-import-book-id';

      const createdImportTask = service.createImport(importDto);

      setTimeout(() => {
        const importTask = service.getAllImports()[TaskStatesEnum.Finished][0];
        expect(importTask).toBeDefined();
        expect(importTask.state).toEqual(TaskStatesEnum.Finished);
        jest.useRealTimers();
      }, 60000);
    });

    it('should create an import', async () => {
      const importRequest: ImportDto = new ImportDto();
      const createdImportTask: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        ...importRequest,
      });
      (taskRepository.create as jest.Mock).mockResolvedValue(createdImportTask);
      (exportImportProcessor.execute as jest.Mock).mockResolvedValue(undefined);

      await expect(service.createImport(importRequest)).resolves.toEqual(
        importRequest,
      );

      expect(taskRepository.create).toHaveBeenCalledWith(importRequest);
      expect(exportImportProcessor.execute).toHaveBeenCalledWith(
        createdImportTask,
      );
    });

    it('should handle duplicate import creation', async () => {
      const importRequest: ImportDto = new ImportDto();

      (taskRepository.create as jest.Mock).mockRejectedValue({
        code: 11000,
      });
      await expect(service.createImport(importRequest)).rejects.toThrow(
        BadRequestException,
      );
      expect(taskRepository.create).toHaveBeenCalledWith(importRequest);
    });
  });

  describe('getAllImports', () => {
    it('should get all imports', async () => {
      const importRequest: ImportDto = new ImportDto();
      const createdImportTask: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        ...importRequest,
      });
      const taskList: TaskDocument[] = [createdImportTask];
      (taskRepository.findAllImports as jest.Mock).mockResolvedValue(taskList);

      const result: TaskStateMap = await service.getAllImports();

      expect(taskRepository.findAllImports).toHaveBeenCalled();
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });
});
