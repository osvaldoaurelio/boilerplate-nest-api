import { ApiProperty } from '@nestjs/swagger';
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
import { PropertyUserDoc } from 'src/user/docs/property-user.doc';
import { StrongPassword } from '../decorators/strong-password.decorator';

export class CreateSignUpDto {
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

  @ApiProperty({ example: PropertyUserDoc.fullName.example })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(128)
  @Trim()
  fullName?: string;
}
