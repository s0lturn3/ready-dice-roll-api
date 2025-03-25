import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDate, IsOptional } from "class-validator";

export class QuestDto {
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
    Descricao: string;

    @ApiProperty()
    @IsDate()
    DtCriacao: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    DtAtualizacao?: string;

    @ApiProperty()
    @IsInt()
    Status: number;
}