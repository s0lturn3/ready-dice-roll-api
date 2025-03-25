import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class AtributoPersonagemDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    PersonagemId: number;

    @ApiProperty()
    @IsInt()
    AtributoId: number;

    @ApiProperty()
    @IsInt()
    Valor: number;
}