import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class TipoItemDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsString()
    Tipo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Descricao?: string;
}