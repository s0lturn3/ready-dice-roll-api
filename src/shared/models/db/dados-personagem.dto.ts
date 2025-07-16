import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class DadosPersonagemDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    PersonagemId: number;

    @ApiProperty()
    @IsInt()
    HPMax: number;

    @ApiProperty()
    @IsInt()
    HPAtual: number;

    @ApiProperty()
    @IsInt()
    MPMax: number;

    @ApiProperty()
    @IsInt()
    MPAtual: number;

    @ApiProperty()
    @IsInt()
    XP: number;

    @ApiProperty()
    @IsInt()
    Nivel: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    RacaId?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    ClasseId?: number;
}