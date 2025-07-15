import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  @Get()
  findAll() {
    return this._usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._usersService.findOne(+id);
  }
  // #endregion GET

  // #region POST
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this._usersService.create(createUserDto);
  }
  // #endregion POST

  // #region PATCH
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.update(+id, updateUserDto);
  }
  // #endregion PATCH

  // #region DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._usersService.remove(+id);
  }
  // #endregion DELETE


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
