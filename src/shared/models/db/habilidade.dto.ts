import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsDate } from "class-validator";

export class HabilidadeDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    CampanhaId: number;

    @ApiProperty()
    @IsString()
    Nome: string;

    @ApiProperty()
    @IsString()
    DescricaoCurta: string;

    @ApiProperty()
    @IsString()
    DescricaoCompleta: string;

    @ApiProperty()
    @IsInt()
    Tipo: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Icone?: string;

    @ApiProperty()
    @IsInt()
    Nivel: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    HabilidadeDependenciaId?: number;

    @ApiProperty()
    @IsDate()
    DataCriacao: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    ExclusivaClasseId?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    ExclusivaRacaId?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    posX?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    posY?: number;
}