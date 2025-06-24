import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse {
  @ApiProperty({ type: Number })
  total_items: number;
}
