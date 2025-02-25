import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTaskDocs } from 'src/common/modules/swagger/docs/task/task-docs';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from './dto/task.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiTaskDocs()
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const t = await this.taskService.create(userId, createTaskDto);

    return plainToInstance(TaskDto, t);
  }

  @ApiTaskDocs()
  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    const t = await this.taskService.findAll(userId);

    return plainToInstance(TaskDto, t);
  }

  @ApiTaskDocs()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const t = await this.taskService.findOne(id);

    return plainToInstance(TaskDto, t);
  }

  @ApiTaskDocs()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const t = await this.taskService.update(id, updateTaskDto);

    return plainToInstance(TaskDto, t);
  }

  @ApiTaskDocs()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const t = await this.taskService.remove(id);

    return plainToInstance(TaskDto, t);
  }
}
