import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDate, IsUUID } from "class-validator";

export class VersaoRegistroDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    RegistroId: number;

    @ApiProperty()
    @IsInt()
    Versao: number;

    @ApiProperty()
    @IsString()
    ConteudoAntigo: string;

    @ApiProperty()
    @IsDate()
    DtModificacao: Date;

    @ApiProperty()
    @IsUUID()
    ModificadoPor: string;
}