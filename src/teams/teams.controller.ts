import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}
  @Get()
  async findAll() {
    return await this.teamService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.teamService.findOne(username);
  }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.create(createTeamDto);
  }

  @Patch(':id')
  async update(@Body() updateTeamDto: UpdateTeamDto, @Param('id') id: number) {
    delete updateTeamDto.created_by;
    return await this.teamService.update(updateTeamDto, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.teamService.remove(id);
  }
}
