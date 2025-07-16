import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsDate } from "class-validator";

export class RegistroDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsString()
    Titulo: string;

    @ApiProperty()
    @IsString()
    Conteudo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Autor?: string;

    @ApiProperty()
    @IsInt()
    CampanhaId: number;

    @ApiProperty()
    @IsDate()
    DtCriacao: string;

    @ApiProperty()
    @IsInt()
    TipoDocumentoId: number;
}