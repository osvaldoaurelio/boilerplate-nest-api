import { Body, Controller, Get, Patch, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiGetMeUserDoc, ApiUpdateUserDoc } from './docs/api-user.doc';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @ApiGetMeUserDoc()
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return plainToInstance(UserDto, user);
  }

  @ApiUpdateUserDoc()
  @Patch()
  async update(
    @CurrentUser('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(userId, updateUserDto);

    return plainToInstance(UserDto, user);
  }
}
