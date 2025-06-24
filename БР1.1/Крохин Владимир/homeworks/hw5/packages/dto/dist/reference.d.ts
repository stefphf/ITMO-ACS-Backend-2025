export interface ReferenceDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTargetDto {
  name: string;
  description?: string;
}
export interface UpdateTargetDto {
  name?: string;
  description?: string;
}
export interface TargetDto extends ReferenceDto {
  exercises?: ExerciseDto[];
}
export interface CreateWeaponTypeDto {
  name: string;
  description?: string;
}
export interface UpdateWeaponTypeDto {
  name?: string;
  description?: string;
}
export interface WeaponTypeDto extends ReferenceDto {
  exercises?: ExerciseDto[];
}
export interface CreateExerciseDto {
  name: string;
  description?: string;
  targetId?: number;
  weaponTypeId?: number;
}
export interface UpdateExerciseDto {
  name?: string;
  description?: string;
  targetId?: number;
  weaponTypeId?: number;
}
export interface ExerciseDto extends ReferenceDto {
  target?: TargetDto;
  targetId?: number;
  weaponType?: WeaponTypeDto;
  weaponTypeId?: number;
}
