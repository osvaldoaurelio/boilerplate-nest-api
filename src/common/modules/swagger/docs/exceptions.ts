import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({
    example: ['property must be a string', 'property should not be empty'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad request' })
  error: string;
}

export class InternalServerError {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;

  @ApiProperty({ example: 'Internal server error' })
  error: string;
}

export class NotFound {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty({ example: 'Resource not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class UnprocessableEntity {
  @ApiProperty({ example: HttpStatus.UNPROCESSABLE_ENTITY })
  statusCode: number;

  @ApiProperty({ example: 'unique property already taken' })
  message: string;

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}
