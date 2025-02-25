import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { getRequestInfo } from '../helpers/get-request-info';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${getRequestInfo(context)} - ${Date.now() - now}ms`,
          'HTTP',
        );
      }),
    );
  }
}
