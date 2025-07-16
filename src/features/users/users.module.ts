import { Module } from '@nestjs/common';
import { DbConnectionService } from 'src/shared/db/db-connection.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [ UsersController ],
  providers: [ UsersService, DbConnectionService ],
})
export class UsersModule {}
