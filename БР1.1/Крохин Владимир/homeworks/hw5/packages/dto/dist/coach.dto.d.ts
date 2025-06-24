export declare class CoachDto {
  id: number;
  userId: number;
  athleteIds: number[];
  createdAt: string;
  updatedAt: string;
}
export declare class CreateCoachDto {
  userId: number;
  firstName: string;
  lastName: string;
  athleteIds?: number[];
}
export declare class UpdateCoachDto {
  firstName?: string;
  lastName?: string;
  athleteIds?: number[];
}
