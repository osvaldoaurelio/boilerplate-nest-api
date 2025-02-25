import { Priority, Task } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaskDto implements Task {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  priority: Priority;

  @Expose()
  isDone: boolean | null;

  @Exclude()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
