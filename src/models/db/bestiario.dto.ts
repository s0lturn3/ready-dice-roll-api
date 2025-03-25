import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class BestiarioDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    CampanhaId?: number;

    @ApiProperty()
    @IsString()
    Nome: string;

    @ApiProperty()
    @IsString()
    Descricao: string;

    @ApiProperty()
    @IsInt()
    TipoCriaturaId: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    Nivel?: number;

    @ApiProperty()
    @IsString()
    DtCriacao: string;
}