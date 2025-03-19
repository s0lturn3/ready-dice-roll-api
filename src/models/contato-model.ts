import { ApiProperty } from "@nestjs/swagger";

export class ContatoModel {
  
  @ApiProperty({ description: 'Primeiro nome da pessoa' })
  public nome: string | null = null;

  @ApiProperty({ description: 'Sobrenome/Último nome da pessoa' })
  public sobrenome: string | null = null;

  @ApiProperty({ description: 'E-mail que devo enviar uma resposta' })
  public email: string | null = null;

  @ApiProperty({ description: 'Lista de opções que o usuário marcou', type: [String] })
  public necessidades: string[] | null = [];

  @ApiProperty({ description: 'Mensagem específica com o pedido necessário' })
  public descricao: string | null = null;

}
