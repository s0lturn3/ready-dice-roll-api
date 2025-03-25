import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class TipoHabilidadeDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    Nivel: number;

    @ApiProperty()
    @IsString()
    Tipo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Descricao?: string;
}