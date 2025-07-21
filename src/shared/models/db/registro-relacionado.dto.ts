import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class RegistroRelacionadoDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    RegistroId: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    ItemId?: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    PersonagemId?: number;
}