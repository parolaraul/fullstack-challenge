import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {ImportTypeEnum} from "../enums/import-type.enum";
import {TaskDto} from "./task.dto";

export class ImportDto extends TaskDto {
    @ApiProperty({
        type: String,
        examples: [ImportTypeEnum.Pdf, ImportTypeEnum.Wattpad],
    })
    @IsEnum(ImportTypeEnum)
    type: ImportTypeEnum;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    url: string;
}
