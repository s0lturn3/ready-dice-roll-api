import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class LocalDto {
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
    @IsOptional()
    @IsString()
    Descricao?: string;

    @ApiProperty()
    @IsString()
    DtCriacao: string;
}