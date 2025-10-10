import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

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
    @IsInt()
    CustoDesbloqueio: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    GraphId: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    posX?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    posY?: number;
}