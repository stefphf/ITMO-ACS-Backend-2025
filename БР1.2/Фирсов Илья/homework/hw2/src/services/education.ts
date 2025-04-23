import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Education } from '../models/Education';

/** Service for managing education entries */
export class EducationService extends BaseService<Education> {
    constructor() {
        super(dataSource.getRepository(Education));
    }

    /** List education entries for a given resume */
    public async listByResume(resumeId: string): Promise<Education[]> {
        return this.repo.find({ where: { resume: { id: resumeId } } as any });
    }
}