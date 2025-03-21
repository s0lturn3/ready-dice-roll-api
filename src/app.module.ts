import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { UsuarioDbModel } from './db/usuario.db';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [ UsuarioController, UploadController ],
  providers: [ UsuarioService, UploadService, UsuarioDbModel ],
})
export class AppModule {}
