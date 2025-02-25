import { Priority } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
