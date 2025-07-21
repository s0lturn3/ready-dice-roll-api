/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserLogin } from 'src/shared/models/auth/iuser-login.model';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  // #region Constructor & Dependencies
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService
  ) { }
  // #endregion Constructor & Dependencies


  // #region Public Methods

  /** Valida se um usuário já está cadastrado no sistema ou não com base no Email/Username informado.
   * 
   * @param usernameOrEmail String com username ou email do usuário
   * @returns Estrutura simples que informa se é um novo usuário ou um já cadastrado
   */
  public async validateUsernameEmail(usernameOrEmail: string): Promise<{ newUser: boolean }> {
    if (!usernameOrEmail) throw new BadRequestException("Informe um nome de usuário ou email.");

    try {
      const user = await this.userRepository.findOne({
        where: [
          { Email: usernameOrEmail },
          { Username: usernameOrEmail }
        ],
      });
  
      if (!user) return { newUser: true };
      return { newUser: false };
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao validar o usuário/email: " + error.message);
    }
  }

  /** Realiza o login de um usuário no sistema.
   * Recebe Email/Username e senha.
   * 
   * @param loginData Dados do login
   * @returns Estrutura com token de aceso, ID e nome do usuário
   */
  public async login(loginData: IUserLogin): Promise<{ access_token: string, userId: string, userName: string }> {
    let responseModel = { access_token: "", userId: "", userName: "" };
    let payload: { sub: string, username: string } = null;
    let userToLogon: User;

    // Busca o usuário no banco
    try {
      userToLogon = await this.userRepository.findOne({
        where: [
          { Senha: loginData.password, Email: loginData.usernameOrEmail },
          { Senha: loginData.password, Username: loginData.usernameOrEmail }
        ]
      });
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro ao realizar login: ${error.message}`);
    }

    if (!userToLogon) throw new UnauthorizedException("Usuário e/ou senha incorreto(s).");

    // Se encontrar o usuário, gera o token de acesso
    payload = { sub: userToLogon.Id, username: userToLogon.Username };
    try {
      responseModel = {
        access_token: await this._jwtService.signAsync(payload),
        userId: userToLogon.Id,
        userName: userToLogon.Username
      };
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro ao gerar o token de acesso: ${error}`);
    }

    // Atualiza data do último login
    this._usersService.updateLastLogin(userToLogon.Id);
    return responseModel;
  }
  // #endregion Public Methods


  // #region Private Methods
  // [...]
  // #endregion Private Methods


  // #region Logic
  // [...]
  // #endregion Logic


  // #region Database Operations
  // [...]
  // #endregion Database Operations


  // #region Validation & Error Handling
  // [...]
  // #endregion Validation & Error Handling


  // #region External Services Integration
  // [...]
  // #endregion External Services Integration


  // #region Utility Methods
  // [...]
  // #endregion Utility Methods
}
