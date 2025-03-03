import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  ApiBadRequestResponseDoc,
  ApiInternalServerErrorResponseDoc,
  ApiNotFoundResponseDoc,
  ApiUnauthorizedResponseDoc,
} from 'src/common/modules/swagger/docs/exceptions.doc';
import { PaginationDoc } from 'src/common/modules/swagger/docs/pagination.doc';
import { days } from 'src/common/utils/time.utils';
import { PropertyTaskDoc } from '../docs/property-task.doc';
import { TaskDto } from '../dtos/task.dto';

export function ApiCreateTaskDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new Task' }),
    ApiCreatedResponse({
      description: 'The Task has been successfully created.',
      type: TaskDto,
    }),
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiFindAllTasksDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all tasks' }),
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
      type: PaginationDoc(TaskDto),
    }),
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiFindOneTaskDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a task by ID' }),
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
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiNotFoundResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiUpdateTaskDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a task by ID' }),
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
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiNotFoundResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}

export function ApiDeleteTaskDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a task by ID' }),
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
    ApiBadRequestResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiNotFoundResponseDoc(),
    ApiInternalServerErrorResponseDoc(),
  );
}
