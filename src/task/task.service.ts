import { Injectable } from '@nestjs/common';
import { EventService } from 'src/common/modules/event/event.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { QueryTaskDto } from './dtos/query-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TASK_EVENT } from './task.listener';

@Injectable()
export class TaskService {
  constructor(
    private readonly event: EventService,
    private readonly prisma: PrismaService,
  ) {}

  async create(id: string, data: CreateTaskDto) {
    const taskCreated = await this.prisma.task.create({
      data: { ...data, userId: id },
    });

    this.event.emit(TASK_EVENT.CREATE, id, data);

    return taskCreated;
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

  async update(id: string, data: UpdateTaskDto) {
    const taskUpdated = await this.prisma.task.update({ where: { id }, data });

    this.event.emit(TASK_EVENT.UPDATE, id, data);

    return taskUpdated;
  }

  async remove(id: string) {
    const taskDeleted = await this.prisma.task.delete({ where: { id } });

    this.event.emit(TASK_EVENT.REMOVE, id);

    return taskDeleted;
  }
}
