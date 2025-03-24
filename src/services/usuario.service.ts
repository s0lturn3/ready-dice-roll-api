import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DbConnectionService } from 'src/db/db-connection.service';
import { UsuarioDtoRecord } from 'src/models/db/usuario.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuarioService {
  
  constructor(
    private readonly _dbConnectionService: DbConnectionService,
    private readonly _jwtService: JwtService
  ) { }

  public async updateLastLogin(userId: string): Promise<void> {
    if (!userId || userId === "") throw new InternalServerErrorException("Não foi possível atualizar o último login do usuário. Tente novamente.");

    const supabase = this._dbConnectionService.createSupabaseClient();

    const { error } = await supabase
      .from('Usuario')
      .update({ DtUltimoLogin: new Date() })
      .eq('Id', userId)
      .select();
      
    if (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao validar o usuário/email: " + error.message);
    }
  }


  public async createUsuario(usuario: UsuarioDtoRecord): Promise<{ access_token: string, userId: string, userName: string }> {
    const supabase = this._dbConnectionService.createSupabaseClient();
    usuario.Id = uuidv4();

    const { data, error } = await supabase
      .from('Usuario')
      .insert([
        {
          Id: usuario.Id,
          Username: usuario.Username,
          Email: usuario.Email,
          Senha: usuario.Senha,
          DtCriacao: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao criar o registro do usuário: " + error.message);
    }

    try {
      const payload = { sub: data[0].Id, username: data[0].Username };
      return {
        access_token: await this._jwtService.signAsync(payload),
        userId: data[0].Id,
        userName: data[0].Username
      };
    }
    catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao gerar o token de acesso. Tente logar novamente: " + error);
    }
  }


  public async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    if (!userId || userId === "") throw new InternalServerErrorException("Não foi possível atualizar a senha do usuário. Tente novamente.");
    if (!oldPassword || oldPassword === "") throw new InternalServerErrorException("Informe a senha atual.");
    if (!newPassword || newPassword === "") throw new InternalServerErrorException("Informe a nova senha.");

    const supabase = this._dbConnectionService.createSupabaseClient();

    const { error } = await supabase
      .from('Usuario')
      .update({ Senha: newPassword })
      .eq('Id', userId)
      .eq('Senha', oldPassword)
      .select();

    if (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao alterar a senha do usuário: " + error.message);
    }
  }

}