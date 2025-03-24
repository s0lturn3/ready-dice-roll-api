import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class UsuarioDtoRecord {

   @ApiProperty()
   @IsString()
   Id: string;

   @ApiProperty()
   @IsString()
   Username: string;

   @ApiProperty()
   @IsEmail(null, { message: "Email inválido." })
   Email: string;

   @ApiProperty()
   @IsString()
   @MinLength(8)
   Senha: string;

   @ApiProperty()
   @IsDate({ message: "Data de último login inválida." })
   DtUltimoLogin: Date;

   @ApiProperty()
   @IsDate({ message: "Data de criação inválida." })
   DtCriacao: Date;

   @ApiProperty()
   @IsString()
   GoogleId: string;

   @ApiProperty()
   @IsString()
   GithubId: string;

   @ApiProperty()
   @IsString()
   MicrosoftId: string;

   @ApiProperty()
   @IsString()
   Imagem?: string;
}