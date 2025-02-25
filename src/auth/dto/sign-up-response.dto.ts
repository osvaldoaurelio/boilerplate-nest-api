import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpResponseDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string | null;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
