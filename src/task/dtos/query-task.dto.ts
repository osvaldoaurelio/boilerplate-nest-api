import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';
import { IsAfterDate } from 'src/common/decorators/is-after-date.decorator';
import { ToISOString } from 'src/common/decorators/to-iso-string.decorator';
import { days } from 'src/common/utils/time.utils';

export class QueryTaskDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsDateString()
  @ToISOString()
  startDate: string = new Date(Date.now() - days(999)).toISOString();

  @IsOptional()
  @IsDateString()
  @ToISOString()
  @IsAfterDate('startDate')
  endDate: string = new Date().toISOString();
}
