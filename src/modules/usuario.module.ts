import { Module } from '@nestjs/common';

import { DbConnectionService } from 'src/db/db-connection.service';
import { UsuarioService } from 'src/services/usuario.service';

@Module({
  imports: [ ],
  providers: [ UsuarioService, DbConnectionService ],
})
export class UsuarioModule { }
