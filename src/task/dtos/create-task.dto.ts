import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PropertyTaskDoc } from '../docs/property-task.doc';

export class CreateTaskDto {
  @ApiProperty(PropertyTaskDoc.title)
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @ApiProperty(PropertyTaskDoc.description)
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @ApiProperty(PropertyTaskDoc.priority)
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
