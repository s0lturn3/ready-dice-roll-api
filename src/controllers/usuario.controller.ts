import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsuarioService } from 'src/services/usuario.service';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor( private readonly usuarioService: UsuarioService ) { }


  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region PATCH
  // [...]
  // #endregion PATCH

  // #region DELETE
  // [...]
  // #endregion DELETE


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
