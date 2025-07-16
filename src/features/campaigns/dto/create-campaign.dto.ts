import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignDto {
  
  @ApiProperty()
  Nome: string;
  
  @ApiProperty()
  Descricao?: string;
  
  @ApiProperty()
  CriadoPor: string;
  
  @ApiProperty()
  DtCriacao: Date;
  
  @ApiProperty()
  Status: number;
  
  @ApiProperty()
  SistemaId?: number;
}
