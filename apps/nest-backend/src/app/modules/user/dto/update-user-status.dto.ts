import { UserStatus } from '../user-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateUserStatusDto {
  status: UserStatus;
}
