import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from 'src/common/decorators/to-lower-case.decorator';
import { PropertyUserDoc } from 'src/user/docs/property-user.doc';
import { StrongPassword } from '../decorators/strong-password.decorator';

export class CreateLogInDto {
  @ApiProperty({ example: PropertyUserDoc.email.example })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ToLowerCase()
  email: string;

  @ApiProperty({ example: PropertyUserDoc.password.example })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @StrongPassword()
  password: string;
}
