import { UtmEntity } from '../entities/utm.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDetailDto {
  @ApiProperty({ name: 'userId', type: Number, nullable: false })
  user_id: number;
  @ApiPropertyOptional({ type: Date, nullable: true })
  ftd_date: Date | null;
  @ApiProperty({ name: 'ftdSum', type: Number, nullable: true })
  ftd_sum: number | null;
  @ApiProperty({ name: 'rd_count', type: Number, nullable: true })
  rd_count: number | null;
  @ApiProperty({ name: 'rd_sum', type: Number, nullable: true })
  rd_sum: number | null;
  @ApiProperty({ name: 'ngr', type: Number, nullable: true })
  ngr: number;
  @ApiProperty({ name: 'total_deps', type: Number, nullable: true })
  total_deps: number;
  @ApiProperty({ name: 'deposit_sum', type: Number, nullable: true })
  deposit_sum: number;
  @ApiProperty({ name: 'rd_avg', type: Number, nullable: true })
  rd_avg: number;
  @ApiProperty({ description: 'Количество аукционов' })
  auctions_count: number;
  win_count: number;
  @ApiPropertyOptional({ type: UtmEntity, nullable: true })
  utm_marker: UtmEntity | null;
}
