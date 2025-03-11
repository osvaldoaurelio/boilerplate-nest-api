import { HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiBadRequestResponseDoc(
  description = 'The request data is invalid.',
) {
  class ResponseType {
    @ApiProperty({ example: HttpStatus.BAD_REQUEST })
    statusCode: number;

    @ApiProperty({ example: 'Invalid request' })
    message: string;

    @ApiProperty({ example: 'BAD_REQUEST' })
    errorCode: string;

    @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
    timestamp: string;
  }

  return ApiBadRequestResponse({ description, type: ResponseType });
}

export function ApiUnauthorizedResponseDoc(
  description = 'The user is not authorized to perform this action.',
) {
  class ResponseType {
    @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
    statusCode: number;

    @ApiProperty({ example: 'Unauthorized request' })
    message: string;

    @ApiProperty({ example: 'UNAUTHORIZED' })
    errorCode: string;

    @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
    timestamp: string;
  }

  return ApiUnauthorizedResponse({ description, type: ResponseType });
}

export function ApiNotFoundResponseDoc(
  description = 'The requested resource was not found.',
) {
  class ResponseType {
    @ApiProperty({ example: HttpStatus.NOT_FOUND })
    statusCode: number;

    @ApiProperty({ example: 'Record not found' })
    message: string;

    @ApiProperty({ example: 'RECORD_NOT_FOUND' })
    errorCode: string;

    @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
    timestamp: string;
  }

  return ApiNotFoundResponse({ description, type: ResponseType });
}

export function ApiConflictResponseDoc(
  description = 'The request could not be completed due to a conflict.',
) {
  class ResponseType {
    @ApiProperty({ example: HttpStatus.CONFLICT })
    statusCode: number;

    @ApiProperty({ example: 'Unique constraint failed' })
    message: string;

    @ApiProperty({ example: 'UNIQUE_CONSTRAINT_FAILED' })
    errorCode: string;

    @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
    timestamp: string;
  }

  return ApiConflictResponse({ description, type: ResponseType });
}

export function ApiInternalServerErrorResponseDoc(
  description = 'The server encountered an internal error.',
) {
  class ResponseType {
    @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
    statusCode: number;

    @ApiProperty({ example: 'Internal server error' })
    message: string;

    @ApiProperty({ example: 'UNKNOWN_ERROR' })
    errorCode: string;

    @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
    timestamp: string;
  }

  return ApiInternalServerErrorResponse({ description, type: ResponseType });
}
