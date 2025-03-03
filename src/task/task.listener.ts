import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { TaskDto } from './dtos/task.dto';

export const TASK_EVENT = {
  CREATE: 'task.create',
  UPDATE: 'task.update',
  REMOVE: 'task.remove',
};

@Injectable()
export class TaskListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(TASK_EVENT.CREATE)
  handleTaskCreateEvent(payload: TaskDto) {
    this.logger.log(payload.id, 'Task created');
  }

  @OnEvent(TASK_EVENT.UPDATE)
  handleTaskUpdateEvent(payload: TaskDto) {
    this.logger.log(payload.id, 'Task updated');
  }

  @OnEvent(TASK_EVENT.REMOVE)
  handleTaskRemoveEvent(payload: TaskDto) {
    this.logger.log(payload.id, 'Task removed');
  }
}
