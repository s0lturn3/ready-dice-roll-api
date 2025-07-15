import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class ParticipanteDto {
    @ApiProperty()
    @IsString()
    Id: string;

    @ApiProperty()
    @IsString()
    UsuarioId: string;

    @ApiProperty()
    @IsInt()
    CampanhaId: number;

    @ApiProperty()
    @IsInt()
    PermissaoId: number;
}