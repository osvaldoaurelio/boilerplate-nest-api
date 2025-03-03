import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskListener } from './task.listener';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskListener],
})
export class TaskModule {}
