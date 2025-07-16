/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { DbConnectionService } from 'src/shared/db/db-connection.service';
import { CampanhaDto } from 'src/shared/models/db/campanha.dto';

@Injectable()
export class CampaignsService {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private supabase: SupabaseClient<any, "public", any>;
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========

  constructor( private readonly _dbConn: DbConnectionService ) {
    this.initializeConnection();
  }

  // #region ==========> API METHODS <==========

  // #region GET
  public async getList(): Promise<any> {
    let response: CampanhaDto[];

    try {
      

      const { data, error } = await this.supabase
        .from('Campanha')
        .select('*')
        .order('Nome')

      return data;

      response = data;
      return response;
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro interno ao buscar a lista de Campanhas.: ${error}`);
    }
  }
  // #endregion GET

  // #region POST
  public async create(campanhaData: CampanhaDto): Promise<void> {
    // const supabase = this._dbConn.createSupabaseClient();
    
  }
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  private initializeConnection(): void {
    try {
      this.supabase = this._dbConn.createSupabaseClient();
    }
    catch (error) {
      throw new InternalServerErrorException(`Ocorreu um erro ao se conectar com a base de dados: ${error}`);
    }
  }
  // #endregion ==========> UTILS <==========


  // create(createCampaignDto: CreateCampaignDto) {
  //   return 'This action adds a new campaign';
  // }

  // findAll() {
  //   return `This action returns all campaigns`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} campaign`;
  // }

  // update(id: number, updateCampaignDto: UpdateCampaignDto) {
  //   return `This action updates a #${id} campaign`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} campaign`;
  // }
}
