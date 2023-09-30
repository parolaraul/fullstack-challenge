import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExportTypeEnum } from '../enums/export-type.enum';
import { TaskDto } from './task.dto';

export class ExportDto extends TaskDto {
  @ApiProperty({
    type: String,
    examples: [ExportTypeEnum.Pdf, ExportTypeEnum.Epub],
  })
  @IsEnum(ExportTypeEnum)
  type: ExportTypeEnum;
}
