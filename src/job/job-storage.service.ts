import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOffer } from './entities/job.entity';
import { Repository } from 'typeorm';
import { DatabaseException } from '../common/exceptions/database.exception';

@Injectable()
export class JobStorageService {
  constructor(
    @InjectRepository(JobOffer)
    private readonly jobRepository: Repository<JobOffer>,
  ) {}

  async storeJobs(jobs: Partial<JobOffer>[]) {
    try {
      await this.jobRepository
        .createQueryBuilder()
        .insert()
        .into(JobOffer)
        .values(jobs)
        .orIgnore()
        .execute();
    } catch (error) {
      throw new DatabaseException('Failed to save jobs to the database');
    }
  }
}
