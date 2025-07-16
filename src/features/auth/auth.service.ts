/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { DbConnectionService } from 'src/shared/db/db-connection.service';
import { IUserLogin } from 'src/shared/models/auth/iuser-login.model';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly _dbConn: DbConnectionService,
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService
  ) { }

  public async validateUsernameEmail(usernameOrEmail: string): Promise<{ newUser: boolean }> {
    if (!usernameOrEmail) throw new BadRequestException("Informe um nome de usuário ou email.");

    const supabase = this._dbConn.createSupabaseClient();

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
    let supabase: SupabaseClient<any, "public", any>;

    try {
        supabase = this._dbConn.createSupabaseClient();
    }
    catch (error) {
        throw new InternalServerErrorException(`Ocorreu um erro ao se conectar com a base de dados: ${error}`);
    }

    let responseModel = { access_token: "", userId: "", userName: "" };
    
    const { data, error } = await supabase
        .from('Usuario')
        .select('Id, Username, Email')
        .or(`Email.eq.${loginData.usernameOrEmail}, Username.eq.${loginData.usernameOrEmail}`)
        .eq('Senha', `${loginData.password}`);

    if (error) {
        throw new InternalServerErrorException(`Ocorreu um erro ao realizar login: ${error.message}`);
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
        throw new InternalServerErrorException(`Ocorreu um erro ao gerar o token de acesso: ${error}`);
    }

    this._usersService.updateLastLogin(data[0].Id);
    return responseModel;
  }



  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
