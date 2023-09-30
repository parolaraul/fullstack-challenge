import { Test, TestingModule } from '@nestjs/testing';
import { ExportImportController } from './export-import.controller';
import { ExportImportService } from './export-import.service';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { TaskStateMap } from './dto/task.dto';
import { ExportTypeEnum } from './enums/export-type.enum';
import { ImportTypeEnum } from './enums/import-type.enum';

describe('ExportImportController', () => {
  let controller: ExportImportController;
  let service: ExportImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportImportController],
      providers: [ExportImportService],
    }).compile();

    controller = module.get<ExportImportController>(ExportImportController);
    service = module.get<ExportImportService>(ExportImportService);
  });

  describe('createExportRequest', () => {
    it('should create an export task', () => {
      // Create a sample ExportDto
      const exportDto: ExportDto = new ExportDto();
      exportDto.type = ExportTypeEnum.Pdf; // Set the type to a valid value

      // Mock the exportImportService's createExport method
      const mockCreatedTask = { ...exportDto };
      jest.spyOn(service, 'createExport').mockReturnValue(mockCreatedTask);

      // Call the controller method
      const createdExportTask = controller.createExportRequest(exportDto);

      // Assert that the service method was called with the expected input
      expect(service.createExport).toHaveBeenCalledWith(exportDto);

      // Assert that the result matches the mocked task
      expect(createdExportTask).toEqual(mockCreatedTask);
    });
  });

  describe('getExportRequests', () => {
    it('should return a list of export tasks', () => {
      const exportTasks: TaskStateMap = {};
      jest.spyOn(service, 'getAllExports').mockReturnValue(exportTasks);

      const result = controller.getExportRequests();
      // Assert the result matches the expected export tasks
      expect(result).toEqual(exportTasks);
    });
  });

  describe('createImportRequest', () => {
    it('should create an import task', () => {
      // Create a sample ImportDto
      const importDto: ImportDto = new ImportDto();
      importDto.type = ImportTypeEnum.Pdf;
      importDto.url = 'https://reedsy.com/sample.pdf';

      // Mock the exportImportService's createImport method
      const mockCreatedTask = { ...importDto };
      jest.spyOn(service, 'createImport').mockReturnValue(mockCreatedTask);

      // Call the controller method
      const createdImportTask = controller.createImportRequest(importDto);

      // Assert that the service method was called with the expected input
      expect(service.createImport).toHaveBeenCalledWith(importDto);

      // Assert that the result matches the mocked task
      expect(createdImportTask).toEqual(mockCreatedTask);
    });
  });

  describe('getImportRequests', () => {
    it('should return a list of import tasks', () => {
      const importTasks: TaskStateMap = {};
      jest.spyOn(service, 'getAllImports').mockReturnValue(importTasks);

      const result = controller.getImportRequests();
      // Assert the result matches the expected import tasks
      expect(result).toEqual(importTasks);
    });
  });
});
