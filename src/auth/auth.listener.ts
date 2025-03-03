import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/common/modules/logger/logger.service';

export const AUTH_EVENT = {
  SIGNUP: 'auth.signup',
};

@Injectable()
export class AuthListener {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(AUTH_EVENT.SIGNUP)
  handleAuthCreateEvent([id, data]: any[]) {
    this.logger.log(
      `${JSON.stringify({ id })} ${JSON.stringify({ data })}`,
      'User created',
    );
  }
}
