export declare class AthleteDto {
  id: number;
  userId: number;
  coachIds: number[];
  createdAt: string;
  updatedAt: string;
}
export declare class CreateAthleteDto {
  userId: number;
  coachIds?: number[];
}
export declare class UpdateAthleteDto {
  coachIds?: number[];
}
