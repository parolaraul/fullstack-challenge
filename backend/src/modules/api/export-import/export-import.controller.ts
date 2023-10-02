import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExportImportService } from './export-import.service';
import { TaskStateMap } from './dto/task.dto';

@Controller({ version: '1', path: 'tasks' })
@ApiTags('tasks')
export class ExportImportController {
  constructor(private readonly exportImportService: ExportImportService) {}

  @Post('exports')
  @ApiOperation({ summary: 'Create export task' })
  async createExportRequest(
    @Body() exportRequest: ExportDto,
  ): Promise<ExportDto> {
    const exportTask: ExportDto = Object.assign(new ExportDto(), exportRequest);
    return await this.exportImportService.createExport(exportTask);
  }

  @Get('exports')
  @ApiOperation({ summary: 'List all existing export tasks' })
  async getExportRequests(): Promise<TaskStateMap> {
    return await this.exportImportService.getAllExports();
  }

  @Post('imports')
  @ApiOperation({ summary: 'Create import task' })
  async createImportRequest(
    @Body() importRequest: ImportDto,
  ): Promise<ImportDto> {
    const importTask: ImportDto = Object.assign(new ImportDto(), importRequest);
    return await this.exportImportService.createImport(importTask);
  }

  @Get('imports')
  @ApiOperation({ summary: 'List all existing import tasks' })
  async getImportRequests(): Promise<TaskStateMap> {
    return await this.exportImportService.getAllImports();
  }
}
