import { ApiPropertyOptions } from '@nestjs/swagger';

export class PropertyUserDoc {
  static readonly id: ApiPropertyOptions = {
    example: '646f1234-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the Task.',
  };

  static readonly fullName: ApiPropertyOptions = {
    example: 'John Doe',
    description: 'The full name of the user.',
  };

  static readonly email: ApiPropertyOptions = {
    example: 'johndoe@example.com',
    description: 'The email address of the user.',
  };

  static readonly password: ApiPropertyOptions = {
    example: 'Pass@123',
    description: 'The password of the user.',
  };

  static readonly image: ApiPropertyOptions = {
    example: 'https://example.com/image.jpg',
    description: 'The URL of the user image.',
  };

  static readonly isActive: ApiPropertyOptions = {
    example: true,
    description: 'Indicates whether the user is active or not.',
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
