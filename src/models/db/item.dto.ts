import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsDate } from "class-validator";

export class ItemDto {
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
    @IsOptional()
    @IsInt()
    TipoItemId?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Raridade?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    Valor?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    Peso?: number;

    @ApiProperty()
    @IsDate()
    DtCriacao: string;
}