export declare class TargetDto {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export declare class CreateTargetDto {
  name: string;
  description?: string;
}
export declare class UpdateTargetDto {
  name?: string;
  description?: string;
}
export declare class WeaponTypeDto {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export declare class CreateWeaponTypeDto {
  name: string;
  description?: string;
}
export declare class UpdateWeaponTypeDto {
  name?: string;
  description?: string;
}
export declare class ExerciseDto {
  id: number;
  name: string;
  description: string;
  targetId: number;
  weaponTypeId: number;
  createdAt: string;
  updatedAt: string;
}
export declare class CreateExerciseDto {
  name: string;
  description?: string;
  targetId: number;
  weaponTypeId: number;
}
export declare class UpdateExerciseDto {
  name?: string;
  description?: string;
  targetId?: number;
  weaponTypeId?: number;
}
