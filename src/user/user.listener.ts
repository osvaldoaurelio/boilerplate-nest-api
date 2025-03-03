import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';

export const USER_EVENT = {
  UPDATE: 'user.update',
};

@Injectable()
export class UserListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(USER_EVENT.UPDATE)
  handleUserUpdateEvent([id, data]: any[]) {
    this.logger.log(
      `${JSON.stringify({ id })} ${JSON.stringify({ data })}`,
      'User updated',
    );
  }
}
