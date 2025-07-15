import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';

import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './services/auth.service';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CampanhasModule } from './campanhas/campanhas.module';
import { CharactersModule } from './characters/characters.module';
import { CampanhaController } from './controllers/campanha.controller';
import { DbConnectionService } from './db/db-connection.service';
import { jwtConstants } from './models/constants/constants';
import { CampanhaModule } from './modules/campanha.module';
import { CampanhaService } from './services/campanha.service';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { UsuariosModule } from './usuarios/usuarios.module';

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
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.ts')],
      })
    }),
    UsuariosModule,
    CampanhasModule,
    UsersModule,
    CampaignsModule,
    CharactersModule,
    SessionsModule
  ],
  controllers: [ UsuarioController, AuthController, CampanhaController ],
  providers: [ AuthService, UsuarioService, CampanhaService, DbConnectionService ],
})
export class AppModule { }
