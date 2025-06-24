import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiPropertyOptional({ description: 'Бот', default: false })
  is_bot?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiPropertyOptional({
    description: 'Прикреплять статистику',
    default: false,
  })
  attach_stats?: boolean;
}
