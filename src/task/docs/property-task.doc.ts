import { ApiPropertyOptions } from '@nestjs/swagger';

export class PropertyTaskDoc {
  static readonly id: ApiPropertyOptions = {
    example: '646f1234-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the Task.',
  };

  static readonly title: ApiPropertyOptions = {
    example: 'task 1',
    description: 'The title of the Task.',
  };

  static readonly description: ApiPropertyOptions = {
    example: 'task description',
    description: 'The description of the Task.',
  };

  static readonly priority: ApiPropertyOptions = {
    example: 'LOW',
    description: 'The priority of the Task.',
  };

  static readonly isDone: ApiPropertyOptions = {
    example: false,
    description: 'The status of the Task.',
  };

  static readonly userId: ApiPropertyOptions = {
    example: this.id.example,
    description: 'The user ID of the Task.',
  };

  static readonly createdAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Task was created.',
  };

  static readonly updatedAt: ApiPropertyOptions = {
    example: this.createdAt.example,
    description: 'The date and time when the Task was last updated.',
  };
}
