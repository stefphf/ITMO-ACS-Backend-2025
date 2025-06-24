import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse {
  @ApiProperty({ type: Number, required: false })
  total_items?: number;
}
