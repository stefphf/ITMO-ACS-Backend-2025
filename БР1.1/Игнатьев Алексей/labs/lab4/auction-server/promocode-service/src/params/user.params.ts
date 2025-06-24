import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateParams } from './pagination.params.dto';

export class UserParams extends PaginateParams {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'ID' })
  user_id?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Имя' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Фамилия' })
  last_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Email' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Имя пользователя' })
  username?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Бот', default: false, type: Boolean })
  is_bot?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Прикреплять статистику',
    default: false,
  })
  attach_stats?: boolean;
}
