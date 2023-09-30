import { Test, TestingModule } from '@nestjs/testing';
import { ExportImportService } from './export-import.service';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { ExportTypeEnum } from './enums/export-type.enum';
import { TaskStatesEnum } from './enums/task-states.enum';
import { ImportTypeEnum } from './enums/import-type.enum';

describe('ExportImportService', () => {
  let service: ExportImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportImportService],
    }).compile();

    service = module.get<ExportImportService>(ExportImportService);
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
      }, 10005);
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
      }, 25005);
    });
  });

  describe('getAllExports', () => {
    it('should return all export tasks', () => {
      const exportDto: ExportDto = new ExportDto();
      exportDto.type = ExportTypeEnum.Pdf;
      exportDto.bookId = 'unique-book-id';

      const createdExportTask = service.createExport(exportDto);

      const exportTasks = service.getAllExports();

      expect(exportTasks).toBeDefined();
      expect(Object.keys(exportTasks).length).toBeGreaterThan(0);
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
  });

  describe('getAllImports', () => {
    it('should return all import tasks', () => {
      const importDto: ImportDto = new ImportDto();
      importDto.type = ImportTypeEnum.Pdf;
      importDto.bookId = 'unique-import-book-id';

      const createdImportTask = service.createImport(importDto);
      const importTasks = service.getAllImports();

      expect(importTasks).toBeDefined();
      expect(Object.keys(importTasks).length).toBeGreaterThan(0);
    });
  });
});
