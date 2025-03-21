import { IUserLogin } from './../models/auth/iuser-login.model';
import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsuarioService } from 'src/services/usuario.service';


@ApiTags('Auth')
@Controller('auth')
export class UsuarioController {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor( private readonly usuarioService: UsuarioService ) { }


  // #region GET
  
  @ApiOperation({ summary: 'Busca todos os usuários cadastrados na tabela Usuario.' })
  @ApiResponse({ status: 200, description: 'Usuários retornados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar os usuários.' })
  @Get('getAll')
  public get(): any {
    return this.usuarioService.login();
  }

  // #endregion GET

  // #region POST

  @ApiOperation({ summary: 'Valida o login do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário logado.', type: IUserLogin })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar o usuário.' })
  @Post('login')
  public async login(@Body() loginData: IUserLogin): Promise<IUserLogin> {
    this.validateLoginParams(loginData);

    await this.usuarioService.login(loginData);

    return loginData;
  }

  // #endregion POST

  // #region PATCH
  // [...]
  // #endregion PATCH

  // #region DELETE
  // [...]
  // #endregion DELETE


  // #region ==========> UTILS <==========
  private validateLoginParams(params: IUserLogin): void {
    if (!params.usernameOrEmail || !params.password) throw new BadRequestException("Todos os campos são obrigatórios");
  }
  // #endregion ==========> UTILS <==========

}
