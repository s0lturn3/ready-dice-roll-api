import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { User } from "src/features/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Campanha' })
export class Campaign {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  @IsInt()
  Id: number;

  @Column('text')
  @ApiProperty()
  @IsString()
  Nome: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  @IsOptional()
  @IsString()
  Descricao?: string;

  @ManyToOne(() => User, (user) => user.Id)
  @JoinColumn({ name: "CriadoPor" })  // Necessário se o banco tiver sido criado antes do código, pois isso deixará explícito o nome da coluna do JOIN ao invés de criar um automático
  @ApiProperty()
  @IsString()
  CriadoPor: string;

  @Column('date')
  @ApiProperty()
  @IsDate()
  DtCriacao: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  @IsOptional()
  @IsDate()
  DtUltAtualizacao?: Date;

  @Column('int')
  @ApiProperty()
  @IsInt()
  Status: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  @IsOptional()
  @IsInt()
  SistemaId?: number;
}
