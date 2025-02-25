import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { TransformableInfo } from 'logform';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.printf((info: TransformableInfo) => {
              const level = info.level;
              const context = (info.context as string) || 'App';
              const message = info.message as string;
              const timestamp = info.timestamp as string;
              const stack = info.stack ? `\n${info.stack as string}` : '';

              return `${level}: [${context}] ${message} ${timestamp}${stack}`;
            }),
          ),
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { stack: trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
