import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { IUserLogin } from 'src/shared/models/auth/iuser-login.model';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {

  // #region ==========> PROPERTIES <==========
       
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(
    private readonly _demoService: DemoService
  ) { }


  // #region GET
  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca a lista de campanhas cadastradas para uso simplificado.' })
  @ApiResponse({ status: 200, description: 'Campanhas encontradas.', type: Campaign })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro interno do servidor.' })
  @Get('campaigns')
  public async list(): Promise<Campaign[]> {
    return this._demoService.getCampanhasForSelect();
  }

  // #endregion GET

  // #region POST

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza um login frio com base no Personagem e Campanha selecionados.' })
  @ApiResponse({ status: 200, description: 'Login efetuado.', type: IUserLogin })
  @ApiResponse({ status: 400, description: 'Ocorreu um erro com a requisição. Verifique os parâmetros.' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro de conexão ao buscar o usuário.' })
  @Post('login')
  public async demoLogin(@Query('campanha') campanha: string, @Query('personagem') personagem: string): Promise<{ access_token: string, userId: string, userName: string }> {

    this.validateParams(campanha, personagem);

    // Realiza um login com base no personagem e campanha selecionados
    const { access_token, userId, userName } = await this._demoService.demoLogin(campanha, personagem);

    // Gera o token e retorna para o frontend
    return { access_token, userId, userName };
  }
  // #endregion POST


  // #region ==========> UTILS <==========
  private validateParams(campanha: string, personagem: string): void {
    if (!campanha || !personagem) throw new BadRequestException("Todos os campos são obrigatórios");
  }
  // #endregion ==========> UTILS <==========

}
