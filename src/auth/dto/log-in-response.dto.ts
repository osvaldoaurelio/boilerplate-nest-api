import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LogInResponseDto {
  @Expose()
  access_token: string;
}
