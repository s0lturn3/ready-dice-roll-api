import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Usuario' })
export class UsuarioDtoRecord {
   @PrimaryGeneratedColumn('uuid')
   @ApiProperty()
   @IsString()
   Id: string;

   @Column('text')
   @ApiProperty()
   @IsString()
   Username: string;

   @Column('text')
   @ApiProperty()
   @IsEmail(null, { message: "Email inválido." })
   Email: string;

   @Column('text')
   @ApiProperty()
   @IsString()
   @MinLength(8)
   Senha: string;

   @Column('date')
   @ApiProperty()
   @IsDate({ message: "Data de último login inválida." })
   DtUltimoLogin: Date;

   @Column('date')
   @ApiProperty()
   @IsDate({ message: "Data de criação inválida." })
   DtCriacao: Date;

   @Column('text')
   @ApiProperty()
   @IsString()
   GoogleId: string;

   @Column('text')
   @ApiProperty()
   @IsString()
   GithubId: string;

   @Column('text')
   @ApiProperty()
   @IsString()
   MicrosoftId: string;

   @Column('text')
   @ApiProperty()
   @IsString()
   Imagem?: string;
}