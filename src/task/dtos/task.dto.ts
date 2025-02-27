import { ApiProperty } from '@nestjs/swagger';
import { Priority, Task } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { PropertyTaskDoc } from '../docs/property-task.doc';

@Exclude()
export class TaskDto implements Task {
  @ApiProperty(PropertyTaskDoc.id)
  @Expose()
  id: string;

  @ApiProperty(PropertyTaskDoc.title)
  @Expose()
  title: string;

  @ApiProperty(PropertyTaskDoc.description)
  @Expose()
  description: string | null;

  @ApiProperty(PropertyTaskDoc.priority)
  @Expose()
  priority: Priority;

  @ApiProperty(PropertyTaskDoc.isDone)
  @Expose()
  isDone: boolean | null;

  @ApiProperty(PropertyTaskDoc.userId)
  @Exclude()
  userId: string;

  @ApiProperty(PropertyTaskDoc.createdAt)
  @Expose()
  createdAt: Date;

  @ApiProperty(PropertyTaskDoc.updatedAt)
  @Expose()
  updatedAt: Date;
}
