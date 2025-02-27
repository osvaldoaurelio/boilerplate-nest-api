import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequest,
  InternalServerError,
  Unauthorized,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { UserDto } from '../dtos/user.dto';

export function ApiGetMeUserDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get the current user',
    }),
    ApiOkResponse({
      description: 'Returns the current user.',
      type: UserDto,
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

export function ApiUpdateUserDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update the current user',
    }),
    ApiOkResponse({
      description: 'The User has been successfully updated.',
      type: UserDto,
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
