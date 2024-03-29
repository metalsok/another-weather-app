import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStatus } from './user-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserFilterDto } from './dto/user-filter.dto';

export enum UserErrors {
  DUPLICATE = 23505,
}

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async getUsers(userFilterDto: UserFilterDto): Promise<User[]> {
    const { search, status } = userFilterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        'LOWER(user.name) LIKE LOWER(:search) OR LOWER(user.status) LIKE LOWER(:search)',
        {
          search,
        }
      );
    }
    if (status) {
      query.andWhere('LOWER(user.status) = LOWER(:status)', { status });
    }

    return await query.getMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return user;
  }

  async createUser(username: string, hashedPassword: string): Promise<void> {
    const newUser = this.create({ username, password: hashedPassword });
    try {
      await this.save(newUser);
    } catch (error) {
      throw error; // Let the service layer handle specific error codes and messages
    }
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<string> {
    const updateResult = await this.userRepository.update({ id }, { status });
    if (!updateResult.affected) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return 'Update successful';
  }

  async deleteUser(id: string): Promise<void> {
    const deleteResult = await this.userRepository.delete({ id });

    if (!deleteResult.affected) {
      throw new NotFoundException(`Id ${id} not found`);
    }
  }
}
