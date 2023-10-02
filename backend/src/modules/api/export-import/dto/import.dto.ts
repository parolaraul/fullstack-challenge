import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { ImportTypeEnum } from '../enums/import-type.enum';
import { TaskDto } from './task.dto';
import { TaskKindEnum } from '../enums/task-kind.enum';
import { Exclude, Expose } from 'class-transformer';

export class ImportDto extends TaskDto {
  @ApiProperty({
    type: String,
    examples: [ImportTypeEnum.Pdf, ImportTypeEnum.Wattpad],
  })
  @IsEnum(ImportTypeEnum)
  @Expose()
  type: ImportTypeEnum;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Expose()
  url: string;

  @Exclude()
  kind = TaskKindEnum.Import;
}
