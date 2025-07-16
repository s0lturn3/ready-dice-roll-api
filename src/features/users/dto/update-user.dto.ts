import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
  @ApiProperty()
  Username: string;
  
  @ApiProperty()
  Email: string;
  
  @ApiProperty()
  Senha: string;
  
  @ApiProperty()
  DtUltimoLogin: Date;
  
  @ApiProperty()
  DtCriacao: Date;
  
  @ApiProperty()
  GoogleId?: string;
  
  @ApiProperty()
  GithubId?: string;
  
  @ApiProperty()
  MicrosoftId?: string;
  
  @ApiProperty()
  Imagem?: string;
}
