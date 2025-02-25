import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return plainToInstance(UserDto, user);
  }

  @Patch()
  async updateUser(
    @CurrentUser('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(userId, updateUserDto);

    return plainToInstance(UserDto, user);
  }
}
