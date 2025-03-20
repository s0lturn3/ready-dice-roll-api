import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('getAll')
    getHello(): any {
      return this.usuarioService.login();
    }

}
