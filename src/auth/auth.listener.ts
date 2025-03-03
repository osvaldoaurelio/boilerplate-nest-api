import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { UserDto } from 'src/user/dtos/user.dto';

export const AUTH_EVENT = {
  SIGNUP: 'auth.signup',
};

@Injectable()
export class AuthListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(AUTH_EVENT.SIGNUP)
  handleAuthCreateEvent(payload: UserDto) {
    this.logger.log(payload.id, 'User created');
  }
}
