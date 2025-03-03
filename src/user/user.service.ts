import { Injectable } from '@nestjs/common';
import { EventService } from 'src/common/modules/event/event.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { USER_EVENT } from './user.listener';

@Injectable()
export class UserService {
  constructor(
    private readonly event: EventService,
    private readonly prisma: PrismaService,
  ) {}

  async update(id: string, data: UpdateUserDto) {
    const userUpdated = await this.prisma.user.update({ where: { id }, data });

    this.event.emit(USER_EVENT.UPDATE, userUpdated);

    return userUpdated;
  }
}
