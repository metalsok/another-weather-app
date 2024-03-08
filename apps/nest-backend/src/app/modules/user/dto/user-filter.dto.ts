import { UserStatus } from '../user-status.enum';

export class UserFilterDto {
  search: string;
  status: UserStatus;
}
