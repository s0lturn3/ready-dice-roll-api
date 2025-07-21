/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {

  // #region Constructor & Dependencies
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>
  ) { }
  // #endregion Constructor & Dependencies


  // #region Public Methods

  /** Busca todas as Campanhas na base de dados.
   * 
   * @returns Lista de Campanhas encontradas na base
   */
  public async getList(): Promise<Campaign[]> {
    let response: Campaign[];

    try {
      response = await this.campaignRepository.find();
      return response;
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro interno ao buscar a lista de Campanhas.: ${error}`);
    }
  }

  public async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      const campaign = this.campaignRepository.create(createCampaignDto);
      return await this.campaignRepository.save(campaign);
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro interno ao criar uma Campanha.: ${error}`);
    }
  }
  // #endregion Public Methods


  // #region Private Methods
  // [...]
  // #endregion Private Methods


  // #region Logic
  // [...]
  // #endregion Logic


  // #region Database Operations
  // [...]
  // #endregion Database Operations


  // #region Validation & Error Handling
  // [...]
  // #endregion Validation & Error Handling


  // #region External Services Integration
  // [...]
  // #endregion External Services Integration


  // #region Utility Methods
  // [...]
  // #endregion Utility Methods

}
