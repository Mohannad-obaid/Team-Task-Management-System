import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from 'src/common/enums/user-roles.enum';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
