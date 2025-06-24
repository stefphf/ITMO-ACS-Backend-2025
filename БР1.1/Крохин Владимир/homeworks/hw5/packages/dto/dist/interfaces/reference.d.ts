import {
  ExerciseDto,
  CreateExerciseDto,
  UpdateExerciseDto,
  TargetDto,
  CreateTargetDto,
  UpdateTargetDto,
  WeaponTypeDto,
  CreateWeaponTypeDto,
  UpdateWeaponTypeDto,
} from '../reference.dto';
export {
  ExerciseDto,
  CreateExerciseDto,
  UpdateExerciseDto,
  TargetDto,
  CreateTargetDto,
  UpdateTargetDto,
  WeaponTypeDto,
  CreateWeaponTypeDto,
  UpdateWeaponTypeDto,
};
export interface IReferenceService {
  getAllReferences(): Promise<Record<string, any[]>>;
  getReferenceByName(name: string): Promise<any[]>;
  updateReference(name: string, data: any[]): Promise<any[]>;
}
