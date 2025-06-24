import { ApiProperty } from '@nestjs/swagger';

export class IpDetailEntity {
  @ApiProperty({
    description: 'IP адрес',
    required: false,
    type: String,
  })
  ip_address: string;

  @ApiProperty({
    description: 'Дата создания',
    required: false,
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Город',
    required: false,
    type: String,
  })
  city: string;

  @ApiProperty({
    description: 'Страна',
    required: false,
    type: String,
  })
  countryCode: string;

  @ApiProperty({
    description: 'Хостинг',
    required: false,
    type: Boolean,
  })
  hosting: boolean;

  @ApiProperty({
    description: 'ISP',
    required: false,
    type: String,
  })
  isp: string;

  @ApiProperty({
    description: 'Широта',
    required: false,
    type: Number,
  })
  lat: number;

  @ApiProperty({
    description: 'Долгота',
    required: false,
    type: Number,
  })
  lon: number;

  @ApiProperty({
    description: 'Мобильный',
    required: false,
    type: Boolean,
  })
  mobile: boolean;

  @ApiProperty({
    description: 'Прокси',
    required: false,
    type: Boolean,
  })
  proxy: boolean;

  @ApiProperty({
    description: 'Регион',
    required: false,
    type: String,
  })
  regionName: string;

  @ApiProperty({
    description: 'Статус',
    required: false,
    type: String,
  })
  status: string;

  @ApiProperty({
    description: 'ZIP',
    required: false,
    type: String,
  })
  zip: string;
}
