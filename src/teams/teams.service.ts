import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/database/entities/teams.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { number } from "joi";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(team: CreateTeamDto): Promise<Team> {
    console.log(team.created_by);
    // Check if the user exists
    const user = await this.userRepository.findOne({
      where: { id: team.created_by },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const newTeam = this.teamRepository.create({
        team_name: team.team_name,
        created_by: { id: team.created_by },
      });

      return await this.teamRepository.save(newTeam);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Team with this name already exists');
      }
      throw new InternalServerErrorException('Failed to create teams');
    }
  }

  async findAll(): Promise<Team[]> {
    // return await this.teamRepository.find({ relations: ['created_by'],});
    return await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.created_by', 'user')
      .select([
        'team.team_id',
        'team.team_name',
        'team.created_at',
        'user.id',
        'user.name',
      ])
      .getMany();
  }

  async findOne(name: string): Promise<Team> {
    const lowerCaseName = name.toLowerCase();

    const team = await this.teamRepository
      .createQueryBuilder('teams')
      .where('LOWER(teams.team_name) = :name', { name: lowerCaseName })
      .getOne();

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async update(updateTeam: UpdateTeamDto, idTeam: number): Promise<Team> {

    const team = await this.teamRepository.findOne({
      where: { team_id: idTeam },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    this.teamRepository.merge(team, {
      team_name: updateTeam.team_name,
    });

    const updatedTeam = await this.teamRepository.save(team);

    if (!updatedTeam) {
      throw new InternalServerErrorException(
        'Team could not be created please try again',
      );
    }

    return updatedTeam;
  }

  async remove(id: number): Promise<void> {
    const team = await this.teamRepository.findOne({ where: { team_id: id } });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    await this.teamRepository.delete(id);

    return;
  }
}
