import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { QueryTaskDto } from './dtos/query-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  findAll(userId: string, { page, limit, startDate, endDate }: QueryTaskDto) {
    const between = ([start, end]: string[]) => ({ gte: start, lte: end });

    return this.prisma.$transaction([
      this.prisma.task.findMany({
        where: { userId, createdAt: between([startDate, endDate]) },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.task.count({
        where: { userId, createdAt: between([startDate, endDate]) },
      }),
    ]);
  }

  findOne(id: string) {
    return this.prisma.task.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: string) {
    try {
      return this.prisma.task.delete({ where: { id } });
    } catch {
      return null;
    }
  }
}
