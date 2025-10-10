import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

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
    @IsBoolean()
    IsNpc: boolean;

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