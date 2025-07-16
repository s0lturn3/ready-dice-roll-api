import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(private readonly _usersService: UsersService) {}


  // #region GET
  
  // #endregion GET

  // #region POST
  
  // #endregion POST

  // #region PATCH
  
  // #endregion PATCH

  // #region DELETE
  
  // #endregion DELETE


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
