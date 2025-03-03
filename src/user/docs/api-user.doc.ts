import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  ApiBadRequestResponseDoc,
  ApiInternalServerErrorResponseDoc,
  ApiUnauthorizedResponseDoc,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { UserDto } from '../dtos/user.dto';

export function ApiGetMeUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get the current user' }),
    ApiOkResponse({
      description: 'Returns the current user.',
      type: UserDto,
    }),
    ApiUnauthorizedResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiUpdateUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Update the current user' }),
    ApiOkResponse({
      description: 'The User has been successfully updated.',
      type: UserDto,
    }),
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}
