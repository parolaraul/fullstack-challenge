import { Test, TestingModule } from '@nestjs/testing';
import { ExportImportController } from './export-import.controller';
import { ExportImportService } from './export-import.service';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { TaskStateMap } from './dto/task.dto';
import { ExportTypeEnum } from './enums/export-type.enum';
import { ImportTypeEnum } from './enums/import-type.enum';
import { ExportImportProcessor } from './export-import.processor';
import { TaskRepository } from './schemas/task.repository';

describe('ExportImportController', () => {
  let controller: ExportImportController;
  let service: ExportImportService;
  let taskRepository: TaskRepository;
  let exportImportProcessor: ExportImportProcessor;
  let taskModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportImportController],
      providers: [
        ExportImportService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn(),
            findAllExports: jest.fn(),
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

    controller = module.get<ExportImportController>(ExportImportController);
    service = module.get<ExportImportService>(ExportImportService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    exportImportProcessor = module.get<ExportImportProcessor>(
      ExportImportProcessor,
    );
  });

  describe('createExportRequest', () => {
    it('should create an export task', async () => {
      const exportDto: ExportDto = new ExportDto();
      exportDto.type = ExportTypeEnum.Pdf;

      const mockCreatedTask = { ...exportDto };
      jest.spyOn(service, 'createExport').mockResolvedValue(mockCreatedTask);

      const createdExportTask = await controller.createExportRequest(exportDto);

      expect(service.createExport).toHaveBeenCalledWith(exportDto);
      expect(createdExportTask).toEqual(mockCreatedTask);
    });
  });

  describe('getExportRequests', () => {
    it('should return a list of export tasks', async () => {
      const exportTasks: TaskStateMap = {};
      jest.spyOn(service, 'getAllExports').mockResolvedValue(exportTasks);

      const result = await controller.getExportRequests();
      expect(service.getAllExports).toHaveBeenCalled();
      expect(result).toEqual(exportTasks);
    });
  });

  describe('createImportRequest', () => {
    it('should create an import task', async () => {
      const importDto: ImportDto = new ImportDto();
      importDto.type = ImportTypeEnum.Pdf;
      importDto.url = 'https://some-url.com/sample.pdf';

      const mockCreatedTask = { ...importDto };
      jest.spyOn(service, 'createImport').mockResolvedValue(mockCreatedTask);

      const createdImportTask = await controller.createImportRequest(importDto);

      expect(service.createImport).toHaveBeenCalledWith(importDto);
      expect(createdImportTask).toEqual(mockCreatedTask);
    });
  });

  describe('getImportRequests', () => {
    it('should return a list of import tasks', async () => {
      const importTasks: TaskStateMap = {};
      jest.spyOn(service, 'getAllImports').mockResolvedValue(importTasks);

      const result = await controller.getImportRequests();
      expect(service.getAllImports).toHaveBeenCalled();
      expect(result).toEqual(importTasks);
    });
  });
});
