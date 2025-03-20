import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsuarioService } from 'src/services/usuario.service';


@ApiTags('Auth')
@Controller('auth')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Busca todos os usuários cadastrados na tabela Usuario.' })
  @ApiResponse({ status: 200, description: 'Usuários retornados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar os usuários.' })
  @Get('getAll')
    get(): any {
      return this.usuarioService.login();
    }

}
