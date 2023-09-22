import { Test, TestingModule } from '@nestjs/testing';
import { ExportImportController } from './export-import.controller';

describe('ExportImportController', () => {
  let controller: ExportImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportImportController],
    }).compile();

    controller = module.get<ExportImportController>(ExportImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
