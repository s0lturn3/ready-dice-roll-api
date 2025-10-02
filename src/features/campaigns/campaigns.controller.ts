/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@ApiBearerAuth('access-token')
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
  
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cria uma nova campanha.' })
  @Post()
  public async create(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    return await this._campaignsService.create(createCampaignDto);
  }


  // @Post()
  // create(@Body() createCampaignDto: CreateCampaignDto) {
  //   return this._campaignsService.create(createCampaignDto);
  // }
  // #endregion POST

  // #region PATCH
  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto): Promise<any> {
    return await this._campaignsService.update(id, updateCampaignDto);
  }

  
  // #endregion PATCH

  // #region DELETE
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this._campaignsService.remove(+id);
  // }
  // #endregion DELETE


  // #region ==========> UTILS <==========
  private validateLoginParams(params: CreateCampaignDto): void {
    
  }
  // #endregion ==========> UTILS <==========


}
