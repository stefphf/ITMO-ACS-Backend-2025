import { CategoryDto } from './Category'
import { ThemeDto } from './Theme'

export interface ChannelCreateDto {
  id: string,
  lang: 'en' | 'ru',
  category: string,
  theme: string,
}

export interface ChannelDto {
  id: string
  url: string
  title: string
  views: number
  subs: number
  videos: number
  lang: string
  iconDefault: string
  iconMedium: string
  iconHigh: string
  description: string
  isApproved: boolean
  timeCreate: Date
  timeUpdate: Date
  category: CategoryDto
  theme: ThemeDto
}