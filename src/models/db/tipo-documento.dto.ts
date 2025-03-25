import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class TipoDocumentoDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsString()
    Nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Descricao?: string;
}