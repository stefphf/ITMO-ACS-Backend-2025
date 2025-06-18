/**
 * DTO для создания мишени
 */
export declare class CreateTargetDto {
  name: string;
  image?: string;
  description?: string;
}
/**
 * DTO для обновления мишени
 */
export declare class UpdateTargetDto {
  name?: string;
  image?: string;
  description?: string;
}
/**
 * DTO для ответа с данными мишени
 */
export declare class TargetDto {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * DTO для создания типа оружия
 */
export declare class CreateWeaponTypeDto {
  name: string;
  description?: string;
}
/**
 * DTO для обновления типа оружия
 */
export declare class UpdateWeaponTypeDto {
  name?: string;
  description?: string;
}
/**
 * DTO для ответа с данными типа оружия
 */
export declare class WeaponTypeDto {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * DTO для создания упражнения
 */
export declare class CreateExerciseDto {
  name: string;
  weaponTypeId: number;
  targetId: number;
  shots?: number;
  shotsInSeries?: number;
  duration?: number;
  description?: string;
}
/**
 * DTO для обновления упражнения
 */
export declare class UpdateExerciseDto {
  name?: string;
  weaponTypeId?: number;
  targetId?: number;
  shots?: number;
  shotsInSeries?: number;
  duration?: number;
  description?: string;
}
/**
 * DTO для ответа с данными упражнения
 */
export declare class ExerciseDto {
  id: number;
  name: string;
  weaponTypeId: number;
  targetId: number;
  shots?: number;
  shotsInSeries?: number;
  duration?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
