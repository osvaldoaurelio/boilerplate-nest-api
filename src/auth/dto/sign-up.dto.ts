import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from 'src/common/decorators/to-lower-case.decorator';
import { Trim } from 'src/common/decorators/trim.decorator';
import { PasswordMatches } from '../decorators/password-matches.decorator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ToLowerCase()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @PasswordMatches()
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(128)
  @Trim()
  fullName?: string;
}
