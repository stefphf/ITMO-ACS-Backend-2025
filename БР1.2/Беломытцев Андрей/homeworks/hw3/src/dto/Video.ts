export interface VideoDto {
  id: string
  channelId: string
  title: string
  publishedAt: Date
  thumbnail: string
  length?: number
  views?: number
  description: string
}