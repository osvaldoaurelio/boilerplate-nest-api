import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequest,
  Conflict,
  InternalServerError,
  Unauthorized,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { CreateLogInDto } from '../dtos/create-log-in.dto';
import { CreateSignUpDto } from '../dtos/create-sign-up.dto';
import { LogInDto } from '../dtos/log-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

export function ApiLogInDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Perform a log in',
    }),
    ApiBody({
      type: CreateLogInDto,
      description: 'Log in credentials',
    }),
    ApiOkResponse({
      description: 'Returns an access token.',
      type: LogInDto,
    }),
    ApiBadRequestResponse({
      description: 'The request data is invalid.',
      type: BadRequest,
    }),
    ApiUnauthorizedResponse({
      description: 'The user is not authorized to perform this action.',
      type: Unauthorized,
    }),
    ApiInternalServerErrorResponse({
      description: 'The server encountered an internal error.',
      type: InternalServerError,
    }),
  );
}

export function ApiSignUpDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Perform a sign up',
    }),
    ApiBody({
      type: CreateSignUpDto,
      description: 'Sign up credentials',
    }),
    ApiCreatedResponse({
      description: 'Returns the created user.',
      type: SignUpDto,
    }),
    ApiConflictResponse({
      description: 'The user already exists.',
      type: Conflict,
    }),
    ApiBadRequestResponse({
      description: 'The request data is invalid.',
      type: BadRequest,
    }),
    ApiInternalServerErrorResponse({
      description: 'The server encountered an internal error.',
      type: InternalServerError,
    }),
  );
}
