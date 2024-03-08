import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '../user-status.enum';

export class UserDto {
  name: string;
  @IsEnum(UserStatus)
  status: UserStatus;
}
