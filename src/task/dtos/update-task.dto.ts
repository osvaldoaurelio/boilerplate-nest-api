import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { PropertyTaskDoc } from '../docs/property-task.doc';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty(PropertyTaskDoc.isDone)
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}
