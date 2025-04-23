import { Repository } from 'typeorm';
import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Resume } from '../models/Resume';

/** Service for managing resumes */
export class ResumeService extends BaseService<Resume> {
    constructor() {
        super(dataSource.getRepository(Resume));
    }

    /**
     * List all resumes belonging to a specific user
     */
    public async listByUser(userId: string): Promise<Resume[]> {
        return this.repo.find({
            where: { user: { id: userId } } as any,
            relations: ['educations', 'experiences', 'resumeSkills'],
        });
    }
}