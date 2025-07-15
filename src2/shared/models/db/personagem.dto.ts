import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class PersonagemDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsString()
    Nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    Historia?: string;

    @ApiProperty()
    @IsInt()
    Nivel: number;

    @ApiProperty()
    @IsInt()
    IsNpc: number;

    @ApiProperty()
    @IsString()
    CriadoPor: string;

    @ApiProperty()
    @IsString()
    ControladoPor: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    CampanhaId?: number;
}