import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';

import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './services/auth.service';

import { JwtModule } from '@nestjs/jwt';
import { CampanhaController } from './controllers/campanha.controller';
import { DbConnectionService } from './db/db-connection.service';
import { jwtConstants } from './models/constants/constants';
import { CampanhaModule } from './modules/campanha.module';
import { CampanhaService } from './services/campanha.service';

@Module({
  imports: [
    AuthModule,
    CampanhaModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: (60 * 60) + 's' },
    }),
  ],
  controllers: [ UsuarioController, AuthController, CampanhaController ],
  providers: [ AuthService, UsuarioService, CampanhaService, DbConnectionService ],
})
export class AppModule { }
