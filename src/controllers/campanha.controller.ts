import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CampanhaDto } from 'src/models/db/campanha.dto';
import { CampanhaService } from 'src/services/campanha.service';

@ApiTags('Campanha')
@Controller('campanha')
export class CampanhaController {

  // #region ==========> PROPERTIES <==========
     
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(
    private readonly _campanhaService: CampanhaService
  ) { }


  // #region GET
  
  @UseGuards(AuthGuard)
  @Get('jwttest')
  public async jwttest(): Promise<{ name: string, message: string, expiredAt: string }> {
    return { name: "abc", message: "bca", expiredAt: "cab" };
  }

  // #endregion GET

  // #region POST
  
  @UseGuards(AuthGuard)
  @Post('create')
  public async create(@Body() createCampanhaData: CampanhaDto): Promise<void> {
    await this._campanhaService.create(createCampanhaData);
  }

  // #endregion POST

  // #region PATCH
  // [...]
  // #endregion PATCH

  // #region DELETE
  // [...]
  // #endregion DELETE


  // #region ==========> UTILS <==========
  private validateLoginParams(params: CampanhaDto): void {
    
  }
  // #endregion ==========> UTILS <==========

}
