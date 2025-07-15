import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/modules/usuario.module';
import { UsuarioService } from 'src/services/usuario.service';
import { DbConnectionService } from 'src2/shared/db/db-connection.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
export class AuthModule {}
