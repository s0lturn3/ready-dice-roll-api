import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthModule } from './modules/auth.module';

import { DbConnectionService } from './db/db-connection.service';


@Module({
  imports: [
    AuthModule,

    ConfigModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [ UsuarioController, AuthController ],
  providers: [ AuthService, UsuarioService, DbConnectionService ],
})
export class AppModule { }
