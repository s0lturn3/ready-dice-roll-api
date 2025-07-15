import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID, IsString, IsDate } from "class-validator";

export class ComentarioRegistroDto {
    @ApiProperty()
    @IsInt()
    Id: number;

    @ApiProperty()
    @IsInt()
    RegistroId: number;

    @ApiProperty()
    @IsUUID()
    UsuarioId: string;

    @ApiProperty()
    @IsString()
    Conteudo: string;

    @ApiProperty()
    @IsDate()
    DtCriacao: Date;
}