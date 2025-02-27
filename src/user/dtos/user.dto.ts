import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { PropertyUserDoc } from '../docs/property-user.doc';

@Exclude()
export class UserDto implements User {
  @ApiProperty(PropertyUserDoc.id)
  @Expose()
  id: string;

  @ApiProperty(PropertyUserDoc.email)
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty(PropertyUserDoc.fullName)
  @Expose()
  fullName: string;

  @ApiProperty(PropertyUserDoc.image)
  @Expose()
  image: string | null;

  @ApiProperty(PropertyUserDoc.isActive)
  @Expose()
  isActive: boolean | null;

  @ApiProperty(PropertyUserDoc.createdAt)
  @Expose()
  createdAt: Date;

  @ApiProperty(PropertyUserDoc.updatedAt)
  @Expose()
  updatedAt: Date;
}
