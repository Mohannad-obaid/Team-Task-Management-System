import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  team_name: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}
