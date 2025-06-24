export class ParticipantStatsDto {
  user_id: number;
  username: string;
  bet_amount: number;
  real_sum: number;
  bonus_sum: number;
}

export class AuctionStatsDto {
  auction_id: number;
  users_balance: number;
  lot_price: number;
  participants: ParticipantStatsDto[];
}
