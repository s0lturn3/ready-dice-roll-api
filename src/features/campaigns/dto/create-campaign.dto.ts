import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Nome: string;
  
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Descricao?: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CriadoPor: string;
  
  @ApiProperty()
  @IsDate()
  DtCriacao: Date;
  
  @ApiProperty({ default: 1 })
  @IsInt()
  Status: number;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  SistemaId?: number;

}
