import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';


@Module({
  imports: [ ConfigModule.forRoot() ],
  controllers: [ AppController, UsuarioController ],
  providers: [ AppService, UsuarioService ],
})
export class AppModule {}
