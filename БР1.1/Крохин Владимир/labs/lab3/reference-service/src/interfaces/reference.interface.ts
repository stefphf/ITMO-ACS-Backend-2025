import {
  CreateTargetDto,
  TargetDto,
  UpdateTargetDto,
  CreateWeaponTypeDto,
  WeaponTypeDto,
  UpdateWeaponTypeDto,
} from '../dtos/reference.dto';
import { CreateExerciseDto, ExerciseDto, UpdateExerciseDto } from '../dtos/exercise.dto';

/**
 * Интерфейс сервиса справочных данных
 */
export interface IReferenceService {
  /**
   * Получить все мишени
   */
  getAllTargets(): Promise<TargetDto[]>;

  /**
   * Получить мишень по ID
   * @param id ID мишени
   */
  getTargetById(id: number): Promise<TargetDto>;

  /**
   * Создать новую мишень
   * @param targetData Данные мишени
   */
  createTarget(targetData: CreateTargetDto): Promise<TargetDto>;

  /**
   * Обновить мишень
   * @param id ID мишени
   * @param targetData Новые данные мишени
   */
  updateTarget(id: number, targetData: UpdateTargetDto): Promise<TargetDto>;

  /**
   * Удалить мишень
   * @param id ID мишени
   */
  deleteTarget(id: number): Promise<void>;

  /**
   * Получить все типы оружия
   */
  getAllWeaponTypes(): Promise<WeaponTypeDto[]>;

  /**
   * Получить тип оружия по ID
   * @param id ID типа оружия
   */
  getWeaponTypeById(id: number): Promise<WeaponTypeDto>;

  /**
   * Создать новый тип оружия
   * @param weaponTypeData Данные типа оружия
   */
  createWeaponType(weaponTypeData: CreateWeaponTypeDto): Promise<WeaponTypeDto>;

  /**
   * Обновить тип оружия
   * @param id ID типа оружия
   * @param weaponTypeData Новые данные типа оружия
   */
  updateWeaponType(id: number, weaponTypeData: UpdateWeaponTypeDto): Promise<WeaponTypeDto>;

  /**
   * Удалить тип оружия
   * @param id ID типа оружия
   */
  deleteWeaponType(id: number): Promise<void>;

  /**
   * Получить все упражнения
   */
  getAllExercises(): Promise<ExerciseDto[]>;

  /**
   * Получить упражнение по ID
   * @param id ID упражнения
   */
  getExerciseById(id: number): Promise<ExerciseDto>;

  /**
   * Создать новое упражнение
   * @param exerciseData Данные упражнения
   */
  createExercise(exerciseData: CreateExerciseDto): Promise<ExerciseDto>;

  /**
   * Обновить упражнение
   * @param id ID упражнения
   * @param exerciseData Новые данные упражнения
   */
  updateExercise(id: number, exerciseData: UpdateExerciseDto): Promise<ExerciseDto>;

  /**
   * Удалить упражнение
   * @param id ID упражнения
   */
  deleteExercise(id: number): Promise<void>;

  /**
   * Получить упражнения по типу оружия
   * @param weaponTypeId ID типа оружия
   */
  getExercisesByWeaponType(weaponTypeId: number): Promise<ExerciseDto[]>;
}
