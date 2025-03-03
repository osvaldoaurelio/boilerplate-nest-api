import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskListener } from './task.listener';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskListener],
})
export class TaskModule {}
