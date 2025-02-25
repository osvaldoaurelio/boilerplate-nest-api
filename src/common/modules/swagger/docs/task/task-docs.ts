import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TaskDto } from 'src/task/dto/task.dto';
import { PaginatedBase } from '../base/paginated-base';
import {
  BadRequest,
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from '../exceptions';

class PaginatedTaskDto extends PaginatedBase {
  @ApiProperty({
    description: 'An array of tasks.',
    isArray: true,
    type: TaskDto,
  })
  data: TaskDto[];
}

export function ApiTaskDocs() {
  return function (
    target: object,
    propertyKey:
      | 'create'
      | 'findAll'
      | 'findOne'
      | 'update'
      | 'remove' = 'create',
    descriptor: PropertyDescriptor,
  ) {
    return {
      create: applyDecorators(
        ApiOperation({
          summary: 'Create a new task',
        }),
        ApiCreatedResponse({
          description: 'The task has been successfully created.',
          type: TaskDto,
        }),
        ApiBadRequestResponse({
          description: 'Error: Bad request',
          type: BadRequest,
        }),
        ApiUnprocessableEntityResponse({
          description: 'Error: Unprocessable entity',
          type: UnprocessableEntity,
        }),
        ApiInternalServerErrorResponse({
          description: 'Error: Internal server error',
          type: InternalServerError,
        }),
      ),
      findAll: applyDecorators(
        ApiQuery({
          name: 'page',
          type: Number,
          required: false,
          description: 'Page number',
          example: 1,
        }),
        ApiQuery({
          name: 'limit',
          type: Number,
          required: false,
          description: 'Limit of items per page',
          example: 10,
        }),
        ApiOperation({
          summary: 'Get all tasks',
        }),
        ApiOkResponse({
          description: 'Returns an array of tasks.',
          type: PaginatedTaskDto,
        }),
        ApiInternalServerErrorResponse({
          description: 'Error: Internal server error',
          type: InternalServerError,
        }),
      ),
      findOne: applyDecorators(
        ApiOperation({
          summary: 'Get a task by ID',
        }),
        ApiOkResponse({
          description: 'Returns the task with the specified ID.',
          type: TaskDto,
        }),
        ApiNotFoundResponse({
          description: 'Error: Not found',
          type: NotFound,
        }),
        ApiInternalServerErrorResponse({
          description: 'Error: Internal server error',
          type: InternalServerError,
        }),
      ),
      update: applyDecorators(
        ApiOperation({
          summary: 'Update a task by ID',
        }),
        ApiOkResponse({
          description: 'The task has been successfully updated.',
          type: TaskDto,
        }),
        ApiBadRequestResponse({
          description: 'Error: Bad request',
          type: BadRequest,
        }),
        ApiNotFoundResponse({
          description: 'Error: Not found',
          type: NotFound,
        }),
        ApiInternalServerErrorResponse({
          description: 'Error: Internal server error',
          type: InternalServerError,
        }),
      ),
      remove: applyDecorators(
        ApiOperation({
          summary: 'Delete a task by ID',
        }),
        ApiNoContentResponse({
          description: 'The task has been successfully deleted.',
        }),
        ApiNotFoundResponse({
          description: 'Error: Not found',
          type: NotFound,
        }),
        ApiInternalServerErrorResponse({
          description: 'Error: Internal server error',
          type: InternalServerError,
        }),
      ),
    }[propertyKey](target, propertyKey, descriptor);
  };
}
