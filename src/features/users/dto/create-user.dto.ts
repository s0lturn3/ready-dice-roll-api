import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  Username: string;

  @ApiProperty()
  Email: string;
  
  @ApiProperty()
  Senha: string;
  
  @ApiProperty()
  DtCriacao: Date;
  
  @ApiProperty()
  GoogleId?: string;
  
  @ApiProperty()
  GithubId?: string;
  
  @ApiProperty()
  MicrosoftId?: string;
}
