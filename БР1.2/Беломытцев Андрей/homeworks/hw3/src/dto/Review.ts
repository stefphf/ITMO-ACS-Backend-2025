export interface ReviewCreateDto {
  channelId: string
  text: string
  rate: number
}

export interface ReviewDto {
  id: number
  channelId: string
  userId: number
  timeCreate: Date
  text: string
  rate: number
}