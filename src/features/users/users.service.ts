/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // #region Constructor & Dependencies
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly _jwtService: JwtService
  ) { }
  // #endregion Constructor & Dependencies

  
  // #region Public Methods
  public async updateLastLogin(id: string): Promise<User> {
    if (!id) throw new InternalServerErrorException("Não foi possível atualizar o último login do usuário. Tente novamente.");

    try {
      const user = await this.userRepository.findOne({
        where: { Id: id }
      });

      if (!user) throw new NotFoundException("Nenhum usuário encontrado com a chave informada.");

      user.DtUltimoLogin = new Date();
      return await this.userRepository.save(user);
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao validar o usuário/email: " + error.message);
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<{ access_token: string, userId: string, userName: string }> {
    let createdUser;

    // Cria o novo usuário no banco
    try {
      const user = this.userRepository.create(createUserDto);

      if (!user) throw new InternalServerErrorException("O Usuário não foi criado.");

      user.Id = uuidv4();
      user.DtCriacao = new Date();
      
      createdUser = await this.userRepository.save(user);
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao cadastrar o usuário. Tente logar novamente: " + error);
    }

    if (!createdUser) throw new InternalServerErrorException("O Usuário não foi criado.");

    // Se o usuário foi criado, gera o token de acesso para o login
    try {
      const payload = { sub: createdUser.Id, username: createdUser.Username };

      return {
        access_token: await this._jwtService.signAsync(payload),
        userId: createdUser.Id,
        userName: createdUser.Username
      };
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao gerar o token de acesso. Tente logar novamente: " + error);
    }
  }


  public async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<User> {
    if (!id || id === "") throw new InternalServerErrorException("Não foi possível atualizar a senha do usuário. Tente novamente.");
    if (!oldPassword || oldPassword === "") throw new InternalServerErrorException("Informe a senha atual.");
    if (!newPassword || newPassword === "") throw new InternalServerErrorException("Informe a nova senha.");

    try {
      const user = await this.userRepository.findOne({
        where: { Id: id, Senha: oldPassword }
      });

      if (!user) throw new NotFoundException();

      return await this.userRepository.save(user);
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao alterar a senha do usuário: " + error.message);
    }
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
