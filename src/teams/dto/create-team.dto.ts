import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  team_name: string;

  @IsString()
  @IsNotEmpty()
  created_by: number;
}
