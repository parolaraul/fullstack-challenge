import { Module } from '@nestjs/common';
import {ExportImportController} from "./export-import/export-import.controller";
import {ExportImportService} from "./export-import/export-import.service";

@Module({
    controllers: [ExportImportController],
    providers: [ExportImportService]
})
export class ApiModule {}
