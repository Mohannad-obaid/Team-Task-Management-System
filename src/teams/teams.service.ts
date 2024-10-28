import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/database/entities/teams.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create() {}
}
