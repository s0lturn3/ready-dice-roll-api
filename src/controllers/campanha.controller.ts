import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CampanhaDto } from 'src/models/db/campanha.dto';
import { CampanhaService } from 'src/services/campanha.service';

@ApiTags('Campanhas')
@Controller('campanhas')
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
  @ApiOperation({ summary: 'Busca a lista de campanhas cadastradas pelo usuário ou que ele tenha acesso.' })
  @Get('list')
  public async list(): Promise<any> {
    return this._campanhaService.getList();;
  }
  // #endregion GET

  // #region POST
  
  // @UseGuards(AuthGuard)
  // @Post('create')
  // public async create(@Body() createCampanhaData: CampanhaDto): Promise<void> {
  //   await this._campanhaService.create(createCampanhaData);
  // }

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
