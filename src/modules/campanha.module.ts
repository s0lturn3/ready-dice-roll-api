import { Module } from '@nestjs/common';
import { CampanhaController } from 'src/controllers/campanha.controller';
import { DbConnectionService } from 'src/db/db-connection.service';
import { CampanhaService } from 'src/services/campanha.service';

@Module({
  providers: [ DbConnectionService, CampanhaService ],
  controllers: [ CampanhaController ]
})
export class CampanhaModule { }
