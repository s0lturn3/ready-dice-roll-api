import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';


@Module({
  imports: [ ConfigModule.forRoot() ],
  controllers: [ AppController, UsuarioController, UploadController ],
  providers: [ AppService, UsuarioService, UploadService ],
})
export class AppModule {}
