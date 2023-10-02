import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExportTypeEnum } from '../enums/export-type.enum';
import { TaskDto } from './task.dto';
import { TaskKindEnum } from '../enums/task-kind.enum';
import { Exclude, Expose } from 'class-transformer';

export class ExportDto extends TaskDto {
  @ApiProperty({
    type: String,
    examples: [ExportTypeEnum.Pdf, ExportTypeEnum.Epub],
  })
  @IsEnum(ExportTypeEnum)
  @Expose()
  type: ExportTypeEnum;

  @Exclude()
  kind = TaskKindEnum.Export;
}
