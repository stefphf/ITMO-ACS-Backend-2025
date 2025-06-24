import { Repository } from 'typeorm';
import { ShotEntity } from '../models/shot.entity';
import { ShotDto, CreateShotDto, UpdateShotDto } from '@app/dto';
export declare class ShotService {
  private shotRepository;
  constructor(shotRepository: Repository<ShotEntity>);
  getShotById(id: number): Promise<ShotDto>;
  createShot(dto: CreateShotDto): Promise<ShotDto>;
  updateShot(id: number, dto: UpdateShotDto): Promise<ShotDto>;
  deleteShot(id: number): Promise<void>;
  getShotsBySeriesId(seriesId: number): Promise<ShotDto[]>;
  private mapToDto;
}
