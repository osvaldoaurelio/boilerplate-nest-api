import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import {
  ApiCreateTaskDoc,
  ApiDeleteTaskDoc,
  ApiFindAllTasksDoc,
  ApiFindOneTaskDoc,
  ApiUpdateTaskDoc,
} from '../task/docs/api-task.doc';
import { CreateTaskDto } from './dtos/create-task.dto';
import { QueryTaskDto } from './dtos/query-task.dto';
import { TaskDto } from './dtos/task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskService } from './task.service';

@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiCreateTaskDoc()
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const taskCreated = await this.taskService.create(userId, createTaskDto);

    return plainToInstance(TaskDto, taskCreated);
  }

  @ApiFindAllTasksDoc()
  @Get()
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() queries: QueryTaskDto,
  ) {
    const [tasks, totalItems] = await this.taskService.findAll(userId, queries);

    const totalPages = Math.ceil(totalItems / queries.limit);

    return {
      totalItems,
      totalPages,
      currentPage: queries.page,
      nextPage: queries.page < totalPages ? queries.page + 1 : null,
      data: plainToInstance(TaskDto, tasks),
    };
  }

  @ApiFindOneTaskDoc()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const taskFound = await this.taskService.findOne(id);

    return plainToInstance(TaskDto, taskFound);
  }

  @ApiUpdateTaskDoc()
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const taskUpdated = await this.taskService.update(id, updateTaskDto);

    return plainToInstance(TaskDto, taskUpdated);
  }

  @ApiDeleteTaskDoc()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.remove(id);
  }
}
