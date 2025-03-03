import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';

export const TASK_EVENT = {
  CREATE: 'task.create',
  UPDATE: 'task.update',
  REMOVE: 'task.remove',
};

@Injectable()
export class TaskListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(TASK_EVENT.CREATE)
  handleTaskCreateEvent([id, data]: any[]) {
    this.logger.log(
      `${JSON.stringify({ id })} ${JSON.stringify({ data })}`,
      'Task created',
    );
  }

  @OnEvent(TASK_EVENT.UPDATE)
  handleTaskUpdateEvent([id, data]: any[]) {
    this.logger.log(
      `${JSON.stringify({ id })} ${JSON.stringify({ data })}`,
      'Task updated',
    );
  }

  @OnEvent(TASK_EVENT.REMOVE)
  handleTaskRemoveEvent([id]: any[]) {
    this.logger.log(`${JSON.stringify({ id })}`, 'Task removed');
  }
}
