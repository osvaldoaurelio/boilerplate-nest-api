import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { getUserMeCacheKey } from 'src/common/utils/cache-key.utils';
import { ApiGetMeUserDoc, ApiUpdateUserDoc } from './docs/api-user.doc';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    private readonly userService: UserService,
  ) {}

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

    this.cache.del(getUserMeCacheKey(user));

    return plainToInstance(UserDto, user);
  }
}
