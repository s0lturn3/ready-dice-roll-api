import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class HabilidadeDependenciaDto {
  
  @ApiProperty()
  @IsInt()
  Id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  EdgeId?: string;

  @ApiProperty()
  @IsInt()
  PrerequisitoId: number;

  @ApiProperty()
  @IsInt()
  DependenteId: number;

  @ApiProperty()
  @IsString()
  TipoConexao: string;

}