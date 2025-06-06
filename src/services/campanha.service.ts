import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbConnectionService } from 'src/db/db-connection.service';
import { CampanhaDto } from 'src/models/db/campanha.dto';

@Injectable()
export class CampanhaService {

  constructor(
    private readonly _usuarioDb: DbConnectionService,
    private readonly _jwtService: JwtService
  ) { }


  public async create(campanhaData: CampanhaDto): Promise<void> {
    const supabase = this._usuarioDb.createSupabaseClient();
    
    
    
  }

}
