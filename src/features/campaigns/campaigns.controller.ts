/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { PaginationDto } from 'src/shared/models/pagination.dto';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@ApiBearerAuth('access-token')
@Controller('campaigns')
@ApiTags('Campaigns')
export class CampaignsController {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor( private readonly _campaignsService: CampaignsService ) { }


  // #region GET
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista campanhas com paginação' })
  @ApiResponse({ status: 200, description: 'Lista de campanhas retornada com sucesso' })
  public async listPagination(@Query() pagination: PaginationDto) {
    return this._campaignsService.getListPagination(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Busca uma campanha pelo ID' })
  @ApiResponse({ status: 200, type: Campaign })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  public async getById(@Param('id', ParseIntPipe) id: number): Promise<Campaign> {
    return this._campaignsService.getById(id);
  }
  // #endregion GET

  // #region POST
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cria uma nova campanha.' })
  @ApiResponse({ status: 201, type: Campaign })
  public async create(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    return await this._campaignsService.create(createCampaignDto);
  }
  // #endregion POST

  // #region PATCH
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualiza os dados de uma campanha existente.' })
  @ApiResponse({ status: 200, type: Campaign })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  public async update( @Param('id', ParseIntPipe) id: number, @Body() updateCampaignDto: UpdateCampaignDto ): Promise<Campaign> {
    return this._campaignsService.update(id, updateCampaignDto);
  }
  // #endregion PATCH

  // #region DELETE
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove (soft delete) uma campanha existente' })
  @ApiResponse({ status: 200, description: 'Campanha removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Campanha não encontrada' })
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._campaignsService.remove(id);
  }
  // #endregion DELETE


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
