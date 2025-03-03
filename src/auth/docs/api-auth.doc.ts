import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  ApiBadRequestResponseDoc,
  ApiConflictResponseDoc,
  ApiInternalServerErrorResponseDoc,
  ApiUnauthorizedResponseDoc,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { CreateLogInDto } from '../dtos/create-log-in.dto';
import { CreateSignUpDto } from '../dtos/create-sign-up.dto';
import { LogInDto } from '../dtos/log-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

export function ApiLogInDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Perform a log in' }),
    ApiBody({
      type: CreateLogInDto,
      description: 'Log in credentials',
    }),
    ApiOkResponse({
      description: 'Returns an access token.',
      type: LogInDto,
    }),
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiSignUpDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Perform a sign up' }),
    ApiBody({
      type: CreateSignUpDto,
      description: 'Sign up credentials',
    }),
    ApiCreatedResponse({
      description: 'Returns the created user.',
      type: SignUpDto,
    }),
    ApiConflictResponseDoc(),
    ApiBadRequestResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}
