import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/controllers/usuario.controller';
import { UsuarioDbModel } from 'src/db/usuario.db';
import { UsuarioService } from 'src/services/usuario.service';

@Module({
  controllers: [ UsuarioController ],
  providers: [ UsuarioService, UsuarioDbModel ],
})
export class UsuarioModule { }
