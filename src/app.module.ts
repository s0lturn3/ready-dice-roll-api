import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { DbConnectionService } from './shared/db/db-connection.service';
import { jwtConstants } from './shared/models/constants/constants';

import { AuthController } from './features/auth/auth.controller';
import { AuthModule } from './features/auth/auth.module';
import { AuthService } from './features/auth/auth.service';
import { CampaignsController } from './features/campaigns/campaigns.controller';
import { CampaignsModule } from './features/campaigns/campaigns.module';
import { CampaignsService } from './features/campaigns/campaigns.service';
import { CharactersModule } from './features/characters/characters.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { UsersController } from './features/users/users.controller';
import { UsersModule } from './features/users/users.module';
import { UsersService } from './features/users/users.service';

@Module({
  imports: [
    AuthModule,
    CampaignsModule,

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
        database: configService.get('DB_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/*.entity.ts')],
      })
    }),
    UsersModule,
    CampaignsModule,
    UsersModule,
    CampaignsModule,
    CharactersModule,
    SessionsModule
  ],
  controllers: [ UsersController, AuthController, CampaignsController ],
  providers: [ AuthService, UsersService, CampaignsService, DbConnectionService ],
})
export class AppModule { }
