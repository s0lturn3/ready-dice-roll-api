import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UsuarioDbModel } from 'src/db/usuario.db';
import { IUserLogin } from 'src/models/auth/iuser-login.model';


@Injectable()
export class UsuarioService {
  constructor( private readonly _usuarioDb: UsuarioDbModel ) { }

  public async login(loginData?: IUserLogin): Promise<any> {
    const supabase = this._usuarioDb.createSupabaseClient();
    
    const { data, error } = await supabase
      .from('Usuario')
      .select('Id, Username, Email')
      .or(`Email.eq.${loginData.usernameOrEmail}, Username.eq.${loginData.usernameOrEmail}`)

    console.log(data);
    console.log(error);

    if (error) {
      throw new InternalServerErrorException("Ocorreu um erro ao realizar login: " + error.message);
    }
    
    return data;
  }

}