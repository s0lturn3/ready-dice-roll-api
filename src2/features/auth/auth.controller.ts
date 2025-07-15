import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthGuard } from 'src2/shared/guards/auth.guard';
import { IUserLogin } from 'src2/shared/models/auth/iuser-login.model';
import { UsuarioDtoRecord } from 'src2/shared/models/db/usuario.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

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



  @Get()
  findAll() {
    return this._authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._authService.findOne(+id);
  }
  // #endregion GET

  // #region POST

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Valida o login do usuário.' })
  @ApiResponse({ status: 200, description: 'Usuário logado.', type: IUserLogin })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar o usuário.' })
  @Post('login')
  public async login(@Body() loginData: IUserLogin): Promise<{ access_token: string, userId: string, userName: string }> {
    this.validateLoginParams(loginData);

    const { access_token, userId, userName } = await this._authService.login(loginData);

    return { access_token, userId, userName };
  }
  
  
  @ApiOperation({ summary: 'Cria um usuário novo.' })
  @ApiResponse({ status: 201, description: 'Usuário criado.' })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao criar o usuário.' })
  @Post('signIn')
  public async signIn(@Body() createUsuarioData: UsuarioDtoRecord): Promise<{ access_token: string, userId: string, userName: string }> {
    const { access_token, userId, userName } = await this._usuarioService.createUsuario(createUsuarioData);

    return { access_token, userId, userName };
  }



  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this._authService.create(createAuthDto);
  }
  // #endregion POST

  // #region PATCH
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this._authService.update(+id, updateAuthDto);
  }
  // #endregion PATCH

  // #region DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._authService.remove(+id);
  }
  // #endregion DELETE


  // #region ==========> UTILS <==========
  private validateLoginParams(params: IUserLogin): void {
    if (!params.usernameOrEmail || !params.password) throw new BadRequestException("Todos os campos são obrigatórios");
  }
  // #endregion ==========> UTILS <==========

}
