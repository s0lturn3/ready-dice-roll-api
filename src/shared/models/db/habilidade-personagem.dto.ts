import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt } from "class-validator";

export class HabilidadePersonagemDto {
  
  @ApiProperty()
  @IsInt()
  Id: number;
  
  @ApiProperty()
  @IsInt()
  PersonagemId: number;
  
  @ApiProperty()
  @IsInt()
  HabilidadeId: number;
  
  @ApiProperty()
  @IsBoolean()
  IsDesbloqueada: boolean;
  
  @ApiProperty()
  @IsDate()
  DtDesbloqueio: Date;

}