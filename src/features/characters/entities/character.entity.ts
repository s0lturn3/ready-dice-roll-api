import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { Campaign } from "src/features/campaigns/entities/campaign.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Personagem' })
export class Character {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  @IsInt()
  Id: number;

  @Column({ type: 'text', unique: true })
  @ApiProperty()
  @IsString()
  Nome: string;

  @Column({ type: 'text' })
  @ApiProperty()
  @IsString()
  Historia: string;

  @Column('int')
  @ApiProperty()
  @IsInt()
  Nivel: number;

  @Column({ type: 'int', default: 1 })
  @ApiProperty()
  IsNpc: boolean;

  @Column('date')
  @ApiProperty()
  @IsString()
  CriadoPor: string;

  @Column('text')
  @ApiProperty()
  @IsString()
  ControladoPor: string;

  @Column('int')
  @ApiProperty()
  @IsInt()
  CampanhaId: number;

  
  @ManyToOne(() => Campaign)
  @JoinColumn({ name: 'CampanhaId' })
  campanha: Campaign;
}
