import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { Character } from '../characters/entities/character.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class DemoService {
  
  // #region Constructor & Dependencies
  constructor(
    @InjectRepository(User)
    private readonly _usersRepo: Repository<User>,

    @InjectRepository(Character)
    private readonly _charactersRepo: Repository<Character>,

    @InjectRepository(Campaign)
    private readonly _campaignsRepo: Repository<Campaign>,

    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService
  ) { }
  // #endregion Constructor & Dependencies


  // #region Public Methods

  /** Realiza um login "frio" de um usuário vinculado a um Personagem informado
   * 
   * @param campanha Nome da campanha a ser validada
   * @param personagem Nome do personagem a ser utilizado
   * @returns Estrutura com Token JWT para o usuário, ID e Username do mesmo
  */
  public async demoLogin(campanha: string, personagem: string): Promise<{ access_token: string, userId: string, userName: string }> {
    const character = await this.getCharacter(campanha, personagem);
    const user = await this.getUser(character.CriadoPor);

    const token = await this.generateAccessToken(user);
    await this._usersService.updateLastLogin(user.Id);

    // Atualiza data do último login
    this._usersService.updateLastLogin(user.Id);

    return {
      access_token: token,
      userId: user.Id,
      userName: user.Username,
    };
  }

  /** Busca todas as Campanhas na base de dados para listagem simplificada.
   * @returns Lista de Campanhas encontradas na base
  */
  public async getCampanhasForSelect(): Promise<Campaign[]> {
    let response: Campaign[];

    try {
      response = await this._campaignsRepo.find();
      return response;
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro interno ao buscar a lista de Campanhas.: ${error}`);
    }
  }

  // #endregion Public Methods


  // #region Private Methods
  // [...]
  // #endregion Private Methods


  // #region Utils

  /** Busca o registro de um personagem com base no nome e na campanha a que ele pertence
   * 
   * @param campanha Nome da campanha cujo Personagem existe
   * @param personagem Nome do Personagem a ser buscado
   * @returns Registro do personagem encontrado
  */
  private async getCharacter(campanha: string, personagem: string): Promise<Character> {
    const character = await this._charactersRepo.findOne({
      where: {
        Nome: personagem,
        campanha: { Nome: campanha }
      },
      relations: ['campanha']
    });

    if (!character) throw new NotFoundException(`Personagem "${personagem}" da campanha "${campanha}" não encontrado`);
    return character;
  }

  /** Busca o registro de um usuário com base no ID
   * 
   * @param id ID do usuário a ser buscado
   * @returns Registro do usuário encontrado
   */
  private async getUser(id: string): Promise<User> {
    const user = await this._usersRepo.findOne({ where: { Id: id } });

    if (!user) throw new UnauthorizedException("Usuário de demonstração inválido.");
    return user;
  }

  /** Gera um token de aceso JWT para um usuário
   * 
   * @param user Registro de um usuário para qual o token será gerado
   * @returns Token JWT para o usuário logar no sistema
  */
  private async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.Id, username: user.Username };
    
    return this._jwtService.signAsync(payload);
  }

  // #endregion Utils

}
