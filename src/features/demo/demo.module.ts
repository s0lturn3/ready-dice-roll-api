import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { CharactersService } from '../characters/characters.service';
import { Character } from '../characters/entities/character.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Character]),
    TypeOrmModule.forFeature([Campaign])
  ],
  controllers: [ DemoController ],
  providers: [
    DemoService,
    CharactersService,
    UsersService
  ],
})
export class DemoModule {}
