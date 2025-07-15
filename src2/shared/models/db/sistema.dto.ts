import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsUUID, IsDate } from "class-validator";

export class SistemaDto {
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
    @IsUUID()
    CriadoPor: string;

    @ApiProperty()
    @IsDate()
    DtCriacao: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    DtUltAtualizacao?: string;
}