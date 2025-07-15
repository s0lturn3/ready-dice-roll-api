import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsDate } from "class-validator";

export class CampanhaDto {
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

    @ApiProperty()
    @IsString()
    CriadoPor: string;

    @ApiProperty()
    @IsDate()
    DtCriacao: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    DtUltAtualizacao?: string;

    @ApiProperty()
    @IsInt()
    Status: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    SistemaId?: number;
}