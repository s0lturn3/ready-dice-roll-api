import { Module } from '@nestjs/common';

import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';

import { DbConnectionService } from 'src/db/db-connection.service';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioModule } from './usuario.module';

@Module({
   imports: [
      UsuarioModule
   ],
   providers: [
      AuthService,
      DbConnectionService,
      UsuarioService,
   ],
   controllers: [ AuthController ],
})
export class AuthModule { }
