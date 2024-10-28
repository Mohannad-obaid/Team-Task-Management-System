import { Exclude } from 'class-transformer';
import { UserRole } from 'src/common/enums/user-roles.enum';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  @Exclude()
  password: string;
  role: UserRole;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
