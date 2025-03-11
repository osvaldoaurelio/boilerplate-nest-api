import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export function PaginationDoc<T>(classDataRef: new () => T) {
  class PaginationClass {
    @ApiProperty({
      example: 100,
      description: 'Total number of items.',
    })
    readonly totalItems: number;

    @ApiProperty({
      example: 5,
      description: 'Total number of pages.',
    })
    readonly totalPages: number;

    @ApiProperty({
      example: 1,
      description: 'Current page number.',
    })
    readonly currentPage: number;

    @ApiProperty({
      example: 2,
      description: 'Next page number, or null if there is no next page.',
    })
    readonly nextPage: number | null;

    @ApiProperty({
      description: 'Array of items on the current page.',
      isArray: true,
      type: classDataRef,
    })
    @Type(() => classDataRef)
    readonly data: T[];
  }

  return PaginationClass;
}
