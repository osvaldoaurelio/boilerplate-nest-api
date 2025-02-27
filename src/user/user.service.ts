import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateUserDto) {
    const userUpdated = await this.prisma.user.update({ where: { id }, data });

    return userUpdated;
  }
}
