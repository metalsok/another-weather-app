import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserStatus } from './user-status.enum';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(userFilterDto: UserFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(userFilterDto);
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  updateUserStatus(id: string, status: UserStatus): Promise<string> {
    return this.userRepository.updateUserStatus(id, status);
  }

  deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
