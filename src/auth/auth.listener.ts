import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  EMAIL_SERVICE,
  IEmailService,
} from 'src/common/modules/email/email.interface';
import { LoggerService } from 'src/common/modules/logger/logger.service';

export const AUTH_EVENT = {
  SIGNUP: 'auth.signup',
};

@Injectable()
export class AuthListener {
  constructor(
    @Inject(EMAIL_SERVICE)
    private readonly email: IEmailService,
    private readonly logger: LoggerService,
  ) {}

  @OnEvent(AUTH_EVENT.SIGNUP)
  handleAuthCreateEvent([id, data]: any[]) {
    this.logger.log(
      `${JSON.stringify({ id })} ${JSON.stringify({ data })}`,
      'User created',
    );

    this.email.sendEmail({
      to: data.email,
      subject: 'Welcome',
      template: 'auth/welcome',
      context: {
        full_name: data.fullName,
        url: `http://localhost:3000/auth/confirm-email/${id}`,
      },
    });
  }
}
