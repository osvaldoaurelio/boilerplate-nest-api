import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  fullName: string;

  @Expose()
  image: string | null;

  @Expose()
  isActive: boolean | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
