import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/database/entities/teams.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  providers: [TeamsService],
  controllers: [TeamsController],
  imports: [TypeOrmModule.forFeature([Team, User])],
})
export class TeamsModule {}
