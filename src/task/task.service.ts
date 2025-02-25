import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

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

  findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
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
    return this.prisma.task.delete({ where: { id } });
  }
}
