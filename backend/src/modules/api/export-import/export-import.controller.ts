import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExportDto } from './dto/export.dto';
import { ImportDto } from './dto/import.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExportImportService } from './export-import.service';
import { TaskStateMap } from './dto/task.dto';
import exp from 'constants';

@Controller({ version: '1', path: 'tasks' })
@ApiTags('tasks')
export class ExportImportController {
  constructor(private readonly exportImportService: ExportImportService) {}

  @Post('exports')
  @ApiOperation({ summary: 'Create export task' })
  createExportRequest(@Body() exportRequest: ExportDto): ExportDto {
    const exportTask: ExportDto = Object.assign(new ExportDto(), exportRequest);
    return this.exportImportService.createExport(exportTask);
  }

  @Get('exports')
  @ApiOperation({ summary: 'List all existing export tasks' })
  getExportRequests(): TaskStateMap {
    return this.exportImportService.getAllExports();
  }

  @Post('imports')
  @ApiOperation({ summary: 'Create import task' })
  createImportRequest(@Body() importRequest: ImportDto): ImportDto {
    const importTask: ImportDto = Object.assign(new ImportDto(), importRequest);
    return this.exportImportService.createImport(importTask);
  }

  @Get('imports')
  @ApiOperation({ summary: 'List all existing import tasks' })
  getImportRequests(): TaskStateMap {
    return this.exportImportService.getAllImports();
  }
}
