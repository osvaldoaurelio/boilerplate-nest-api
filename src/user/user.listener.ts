import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { UserDto } from './dtos/user.dto';

export const USER_EVENT = {
  UPDATE: 'user.update',
};

@Injectable()
export class UserListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(USER_EVENT.UPDATE)
  handleUserUpdateEvent(payload: UserDto) {
    this.logger.log(payload.id, 'User updated');
  }
}
