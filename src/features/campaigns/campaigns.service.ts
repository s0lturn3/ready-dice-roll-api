/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/models/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

/**
 * Serviço responsável por gerenciar operações relacionadas à entidade Campanha.
 * 
 * Fornece métodos para CRUD (criação, leitura, atualização e exclusão) de campanhas,
 * incluindo busca paginada, busca por ID, criação, atualização e remoção (soft delete).
 * 
 * @remarks
 * Utiliza o repositório do TypeORM para interagir com a base de dados.
*/
@Injectable()
export class CampaignsService {

  /**
   * Cria uma instância do CampaignsService.
   * 
   * @param campaignRepository Repositório do TypeORM para a entidade Campaign.
  */
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>
  ) { }


  // #region GET

  /** Busca campanhas com paginação, ordenadas por nome (ascendente) e data de criação (descendente).
   * 
   * @param pagination Objeto contendo informações de página e limite.
   * @returns Um objeto contendo a lista paginada de campanhas e o total de registros.
  */
  public async getListPagination(pagination: PaginationDto): Promise<{ records: Campaign[]; total: number }> {
    const { page, limit } = pagination;

    const [records, total] = await this.campaignRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { Nome: 'ASC', DtCriacao: 'DESC' },
    });

    return { records, total };
  }

  /** Busca uma campanha pelo seu ID.
   * 
   * @param id Identificador da campanha.
   * @returns A campanha encontrada.
   * @throws NotFoundException Se a campanha não for encontrada.
  */
  public async getById(id: number): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ where: { Id: id } });

    if (!campaign) {
      throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
    }

    return campaign;
  }

  // #endregion GET

  // #region CREATE

  /** Cria uma nova campanha na base de dados.
   * 
   * @param createCampaignDto Dados para criação da campanha.
   * @returns A campanha criada.
   * @throws InternalServerErrorException Se ocorrer um erro ao criar a campanha.
  */
  public async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      const campaign = this.campaignRepository.create(createCampaignDto);
      return await this.campaignRepository.save(campaign);
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro interno ao criar uma Campanha.: ${error}`);
    }
  }
  // #endregion CREATE

  // #region UPDATE

  /** Atualiza uma campanha existente pelo seu ID.
   * 
   * @param id Identificador da campanha.
   * @param updateCampaignDto Dados para atualização da campanha.
   * @returns A campanha atualizada.
   * @throws NotFoundException Se a campanha não for encontrada.
  */
  public async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
    const campaign = await this.campaignRepository.preload({
      Id: id,
      ...updateCampaignDto,
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha com ID ${id} não encontrada.`);
    }

    return await this.campaignRepository.save(campaign);
  }
  // #endregion UPDATE

  // #region DELETE

  /** Remove (soft delete) uma campanha pelo seu ID.
   * 
   * @param id Identificador da campanha.
   * @throws NotFoundException Se a campanha não for encontrada.
  */
  public async remove(id: number): Promise<void> {
    const result = await this.campaignRepository.delete({ Id: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
    }
  }
  // #endregion DELETE


  // #region Private Methods
  // [...]
  // #endregion Private Methods


  // #region Utils
  // [...]
  // #endregion Utils

}
