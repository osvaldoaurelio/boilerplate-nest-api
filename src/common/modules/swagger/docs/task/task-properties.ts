import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyBase } from '../base/property-base';

export class TaskProperties extends PropertyBase {
  static readonly tagName = 'Tasks';

  static readonly tagDescription = 'Task routes';

  static readonly title: ApiPropertyOptions = {
    example: 'task 1',
    description: 'The title of the Task.',
  };

  static readonly description: ApiPropertyOptions = {
    example: 'task description',
    description: 'The description of the Task.',
  };
}
