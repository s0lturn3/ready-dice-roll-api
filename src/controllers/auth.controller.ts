import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

import { IUserLogin } from 'src/models/auth/iuser-login.model';
import { UsuarioDtoRecord } from 'src/models/db/usuario.dto';
import { AuthService } from 'src/services/auth.service';
import { UsuarioService } from 'src/services/usuario.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

   // #region ==========> PROPERTIES <==========
   
   // #region PRIVATE
   // [...]
   // #endregion PRIVATE

   // #region PUBLIC
   // [...]
   // #endregion PUBLIC

   // #endregion ==========> PROPERTIES <==========


   constructor(
      private readonly _usuarioService: UsuarioService,
      private readonly _authService: AuthService
   ) { }


   // #region GET
   
   @UseGuards(AuthGuard)
   @Get('jwttest')
   public async jwttest(): Promise<{ name: string, message: string, expiredAt: string }> {
      return { name: "abc", message: "bca", expiredAt: "cab" };
   }

   
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Verifica se o usuário já está cadastrado no sistema.' })
   @ApiResponse({ status: 200, description: 'Verificação feita com sucesso.' })
   @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
   @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar o usuário.' })
   @Get('validateUsernameEmail')
   public async validateUsernameEmail(@Query('usernameOrEmail') usernameOrEmail: string): Promise<{ newUser: boolean }> {
      return this._authService.validateUsernameEmail(usernameOrEmail);
   }

   // #endregion GET

   // #region POST

   @ApiOperation({ summary: 'Valida o login do usuário' })
   @ApiResponse({ status: 200, description: 'Usuário logado.', type: IUserLogin })
   @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
   @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar o usuário.' })
   @Post('login')
   public async login(@Body() loginData: IUserLogin): Promise<{ access_token: string, userId: string }> {
      this.validateLoginParams(loginData);

      const { access_token, userId } = await this._authService.login(loginData);

      return { access_token, userId };
   }
   
   
   @ApiOperation({ summary: 'Cria um usuário novo.' })
   @ApiResponse({ status: 201, description: 'Usuário criado.' })
   @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
   @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao criar o usuário.' })
   @Post('signIn')
   public async signIn(@Body() createUsuarioData: UsuarioDtoRecord): Promise<{ access_token: string, userId: string }> {
      const { access_token, userId } = await this._usuarioService.createUsuario(createUsuarioData);

      return { access_token, userId };
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
