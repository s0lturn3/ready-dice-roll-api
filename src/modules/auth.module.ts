import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/models/constants/constants';
import { DbConnectionService } from 'src/db/db-connection.service';
import { UsuarioService } from 'src/services/usuario.service';

@Module({
   imports: [
      UsuarioModule,
      JwtModule.register({
         global: true,
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '60s' },
      }),
   ],
   providers: [ AuthService, DbConnectionService, UsuarioService ],
   controllers: [ AuthController ],
})
export class AuthModule { }
