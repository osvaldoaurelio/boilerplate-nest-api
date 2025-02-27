import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequest,
  InternalServerError,
  NotFound,
  Unauthorized,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { PaginationDoc } from 'src/common/modules/swagger/docs/pagination.doc';
import { days } from 'src/common/utils/time.utils';
import { PropertyTaskDoc } from '../docs/property-task.doc';
import { TaskDto } from '../dtos/task.dto';

class TaskPagineted extends PaginationDoc {
  @ApiProperty({
    description: 'Return an array of tasks.',
    isArray: true,
    type: TaskDto,
  })
  data: TaskDto[];
}

export function ApiCreateTaskDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new Task',
    }),
    ApiCreatedResponse({
      description: 'The Task has been successfully created.',
      type: TaskDto,
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

export function ApiFindAllTasksDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tasks',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page',
      example: 10,
    }),
    ApiQuery({
      name: 'startDate',
      required: false,
      type: String,
      description: 'Start date for filtering tasks (YYYY-MM-DD)',
      example: new Date(Date.now() - days(99)).toISOString(),
    }),
    ApiQuery({
      name: 'endDate',
      required: false,
      type: String,
      description: 'End date for filtering tasks (YYYY-MM-DD)',
      example: new Date().toISOString(),
    }),
    ApiOkResponse({
      description: 'Returns an array of tasks paginated.',
      type: TaskPagineted,
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

export function ApiFindOneTaskDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a task by ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'Task ID',
      example: PropertyTaskDoc.id.example,
    }),
    ApiOkResponse({
      description: 'Returns the task with the specified ID.',
      type: TaskDto,
    }),
    ApiBadRequestResponse({
      description: 'The request data is invalid.',
      type: BadRequest,
    }),
    ApiUnauthorizedResponse({
      description: 'The user is not authorized to perform this action.',
      type: Unauthorized,
    }),
    ApiNotFoundResponse({
      description: 'The task with the specified ID was not found.',
      type: NotFound,
    }),
    ApiInternalServerErrorResponse({
      description: 'The server encountered an internal error.',
      type: InternalServerError,
    }),
  );
}

export function ApiUpdateTaskDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a task by ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'Task ID',
      example: PropertyTaskDoc.id.example,
    }),
    ApiOkResponse({
      description: 'The Task has been successfully updated.',
      type: TaskDto,
    }),
    ApiBadRequestResponse({
      description: 'The request data is invalid.',
      type: BadRequest,
    }),
    ApiUnauthorizedResponse({
      description: 'The user is not authorized to perform this action.',
      type: Unauthorized,
    }),
    ApiNotFoundResponse({
      description: 'The Task with the specified ID was not found.',
      type: NotFound,
    }),
    ApiInternalServerErrorResponse({
      description: 'The server encountered an internal error.',
      type: InternalServerError,
    }),
  );
}

export function ApiDeleteTaskDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a task by ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      required: true,
      description: 'Task ID',
      example: PropertyTaskDoc.id.example,
    }),
    ApiNoContentResponse({
      description: 'The task has been successfully deleted.',
    }),
    ApiBadRequestResponse({
      description: 'The request data is invalid.',
      type: BadRequest,
    }),
    ApiUnauthorizedResponse({
      description: 'The user is not authorized to perform this action.',
      type: Unauthorized,
    }),
    ApiNotFoundResponse({
      description: 'The task with the specified ID was not found.',
      type: NotFound,
    }),
    ApiInternalServerErrorResponse({
      description: 'The server encountered an internal error.',
      type: InternalServerError,
    }),
  );
}
