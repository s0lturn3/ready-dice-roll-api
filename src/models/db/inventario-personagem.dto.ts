import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate } from "class-validator";

export class InventarioPersonagemDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    PersonagemId: number;

    @ApiProperty()
    @IsInt()
    ItemId: number;

    @ApiProperty()
    @IsInt()
    Quantidade: number;

    @ApiProperty()
    @IsDate()
    DtAdicao: string;
}