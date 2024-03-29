import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getUsers(@Query() userFilterDto: UserFilterDto): Promise<User[]> {
    return this.userService.getUsers(userFilterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id/status')
  updateUserStatus(@Param('id') id: string, @Body() updateUserStatus: UpdateUserStatusDto) {
    const { status } = updateUserStatus;
    return this.userService.updateUserStatus(id, status);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }
}
