import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class NivelPermissaoDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    Nivel: number;

    @ApiProperty()
    @IsString()
    Permissao: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Descricao?: string;
}