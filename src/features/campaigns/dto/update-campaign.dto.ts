import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCampaignDto } from './create-campaign.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  
  @ApiProperty()
  Nome: string;
  
  @ApiProperty()
  Descricao?: string;
  
  @ApiProperty()
  CriadoPor: string;
  
  @ApiProperty()
  DtUltAtualizacao?: Date;
  
  @ApiProperty()
  Status: number;
  
  @ApiProperty()
  SistemaId?: number;
}
