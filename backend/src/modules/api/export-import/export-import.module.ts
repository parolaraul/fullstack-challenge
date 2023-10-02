import { Module } from '@nestjs/common';
import { ExportImportController } from './export-import.controller';
import { ExportImportService } from './export-import.service';
import { TaskRepository } from './schemas/task.repository';
import { Task, TasksSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportImportProcessor } from './export-import.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TasksSchema }]),
  ],
  controllers: [ExportImportController],
  providers: [TaskRepository, ExportImportProcessor, ExportImportService],
})
export class ExportImportModule {}
