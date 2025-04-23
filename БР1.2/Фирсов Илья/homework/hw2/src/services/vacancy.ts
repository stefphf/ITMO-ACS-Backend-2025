import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Vacancy } from '../models/Vacancy';

/** Service for managing vacancies */
export class VacancyService extends BaseService<Vacancy> {
    constructor() {
        super(dataSource.getRepository(Vacancy));
    }

    /** List vacancies by company */
    public async listByCompany(companyId: string): Promise<Vacancy[]> {
        return this.repo.find({ where: { company: { id: companyId } } as any, relations: ['skills', 'applications'] });
    }

    /** List active (non-expired) vacancies */
    public async listActive(): Promise<Vacancy[]> {
        const now = new Date();
        return this.repo
            .createQueryBuilder('vacancy')
            .where('vacancy.expireDate IS NULL OR vacancy.expireDate > :now', { now })
            .getMany();
    }
}