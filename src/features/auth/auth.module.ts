import { Module } from '@nestjs/common';
import { DbConnectionService } from 'src/shared/db/db-connection.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule
  ],
  providers: [
    AuthService,
    DbConnectionService,
    UsersService,
  ],
  controllers: [ AuthController ],
})
export class AuthModule {}
