/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CampanhaDto } from 'src/shared/models/db/campanha.dto';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {

  // #region ==========> PROPERTIES <==========
       
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(
    private readonly _campaignsService: CampaignsService
  ) { }


  // #region GET

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Busca a lista de campanhas cadastradas pelo usuário ou que ele tenha acesso.' })
  @Get('list')
  public async list(): Promise<any> {
    return this._campaignsService.getList();
  }



  // @Get()
  // findAll() {
  //   return this._campaignsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this._campaignsService.findOne(+id);
  // }
  // #endregion GET

  // #region POST
  
  // @UseGuards(AuthGuard)
  // @Post('create')
  // public async create(@Body() createCampanhaData: CampanhaDto): Promise<void> {
  //   await this._campaignsService.create(createCampanhaData);
  // }



  // @Post()
  // create(@Body() createCampaignDto: CreateCampaignDto) {
  //   return this._campaignsService.create(createCampaignDto);
  // }
  // #endregion POST

  // #region PATCH
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
  //   return this._campaignsService.update(+id, updateCampaignDto);
  // }
  // #endregion PATCH

  // #region DELETE
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this._campaignsService.remove(+id);
  // }
  // #endregion DELETE


  // #region ==========> UTILS <==========
  private validateLoginParams(params: CampanhaDto): void {
    
  }
  // #endregion ==========> UTILS <==========


}
