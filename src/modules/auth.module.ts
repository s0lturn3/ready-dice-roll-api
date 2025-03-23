import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from 'src/models/constants/constants';

import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';

import { UsuarioModule } from './usuario.module';
import { UsuarioService } from 'src/services/usuario.service';
import { DbConnectionService } from 'src/db/db-connection.service';

@Module({
   imports: [
      UsuarioModule,
      JwtModule.register({
         global: true,
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '10s' },
      }),
   ],
   providers: [
      AuthService,
      DbConnectionService,
      UsuarioService,
   ],
   controllers: [ AuthController ],
})
export class AuthModule { }
