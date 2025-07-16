import { Module } from '@nestjs/common';
import { DbConnectionService } from 'src/shared/db/db-connection.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

@Module({
  controllers: [ CampaignsController ],
  providers: [ CampaignsService, DbConnectionService ],
})
export class CampaignsModule { }
