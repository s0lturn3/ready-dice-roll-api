import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DbConnectionService } from 'src/db/db-connection.service';
import { IUserLogin } from 'src/models/auth/iuser-login.model';
import { UsuarioService } from './usuario.service';

@Injectable()
export class AuthService {

   constructor(
      private readonly _usuarioDb: DbConnectionService,
      private readonly _jwtService: JwtService,
      private readonly _usuarioService: UsuarioService
   ) { }

   public async validateUsernameEmail(usernameOrEmail: string): Promise<{ newUser: boolean }> {
      if (!usernameOrEmail) throw new BadRequestException("Informe um nome de usuário ou email.");

      const supabase = this._usuarioDb.createSupabaseClient();

      const { data, error } = await supabase
         .from('Usuario')
         .select('Id, Username, Email')
         .or(`Email.eq.${usernameOrEmail}, Username.eq.${usernameOrEmail}`)

      if (error) {
         throw new InternalServerErrorException("Ocorreu um erro ao validar o usuário/email: " + error.message);
      }

      if (Array.isArray(data) && data.length === 0) return { newUser: true };
      else return { newUser: false };
   }


   public async login(loginData: IUserLogin): Promise<{ access_token: string, userId: string, userName: string }> {
      const supabase = this._usuarioDb.createSupabaseClient();
      let responseModel = { access_token: "", userId: "", userName: "" };
      
      const { data, error } = await supabase
         .from('Usuario')
         .select('Id, Username, Email')
         .or(`Email.eq.${loginData.usernameOrEmail}, Username.eq.${loginData.usernameOrEmail}`)
         .eq('Senha', `${loginData.password}`);

      if (error) {
         throw new InternalServerErrorException("Ocorreu um erro ao realizar login: " + error.message);
      }

      if (Array.isArray(data) && data.length === 0) {
         throw new UnauthorizedException("Usuário e/ou senha incorreto(s).");
      }

      const payload = { sub: data[0].Id, username: data[0].Username };
      try {
         responseModel = {
            access_token: await this._jwtService.signAsync(payload),
            userId: data[0].Id,
            userName: data[0].Username
         };
      }
      catch (error) {
         throw new InternalServerErrorException("Ocorreu um erro ao gerar o token de acesso: " + error);
      }

      this._usuarioService.updateLastLogin(data[0].Id);
      return responseModel;
   }

}
