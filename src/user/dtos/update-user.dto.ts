import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PropertyUserDoc } from '../docs/property-user.doc';

export class UpdateUserDto {
  @ApiProperty(PropertyUserDoc.fullName)
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty(PropertyUserDoc.image)
  @IsString()
  @IsOptional()
  image: string;
}
