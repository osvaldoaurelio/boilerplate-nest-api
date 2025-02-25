import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { getRequestInfo } from '../helpers/get-request-info';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  constructor(
    adapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {
    super(adapterHost.httpAdapter);
  }

  private createErrorResponse(
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message = 'Internal Server Error',
    errorCode = 'UNKNOWN_ERROR',
  ) {
    return {
      statusCode,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    };
  }

  private handlePrismaException(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const prismaError =
      {
        P2002: this.createErrorResponse(
          HttpStatus.CONFLICT,
          `Unique constraint failed on the fields: (\`${exception.meta?.target as string}\`)`,
          'UNIQUE_CONSTRAINT_FAILED',
        ),
        P2025: this.createErrorResponse(
          HttpStatus.NOT_FOUND,
          `Record (\`${exception.meta?.modelName as string}\`) not found`,
          'RECORD_NOT_FOUND',
        ),
      }[exception.code] ?? this.createErrorResponse();

    return response.status(prismaError.statusCode).json(prismaError);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    this.logger.error(
      getRequestInfo(host),
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
      'GlobalExceptionFilter',
    );

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaException(exception, response);
    }

    if (exception instanceof HttpException) {
      return super.catch(exception, host);
    }

    const errorResponse = this.createErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      exception instanceof Error ? exception.message : 'Internal server error',
    );

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errorResponse);
  }
}
