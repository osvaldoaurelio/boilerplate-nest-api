import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({ example: 'Invalid request' })
  message: string;

  @ApiProperty({ example: 'BAD_REQUEST' })
  errorCode: string;

  @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
  timestamp: string;
}

export class Unauthorized {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized request' })
  message: string;

  @ApiProperty({ example: 'UNAUTHORIZED' })
  errorCode: string;

  @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
  timestamp: string;
}

export class NotFound {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty({ example: 'Record not found' })
  message: string;

  @ApiProperty({ example: 'RECORD_NOT_FOUND' })
  errorCode: string;

  @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
  timestamp: string;
}

export class Conflict {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: number;

  @ApiProperty({ example: 'Unique constraint failed' })
  message: string;

  @ApiProperty({ example: 'UNIQUE_CONSTRAINT_FAILED' })
  errorCode: string;

  @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
  timestamp: string;
}

export class InternalServerError {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;

  @ApiProperty({ example: 'UNKNOWN_ERROR' })
  errorCode: string;

  @ApiProperty({ example: '2030-10-10T00:00:00.000Z' })
  timestamp: string;
}
