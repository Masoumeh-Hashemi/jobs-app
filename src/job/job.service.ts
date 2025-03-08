import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api.exception';

import { JobFetcherService } from './job-fetcher.service';
import { JobTransformerService } from './job-transformer.service';
import { JobStorageService } from './job-storage.service';
import { Repository } from 'typeorm';
import { JobOffer } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(
    private readonly jobFetcherService: JobFetcherService,
    private readonly jobTransformerService: JobTransformerService,
    private readonly jobStorageService: JobStorageService,
    @InjectRepository(JobOffer)
    private readonly jobRepository: Repository<JobOffer>, // Assuming this exists for querying jobs
  ) {}

  async fetchAndStoreJobs(): Promise<void> {
    try {
      const jobs = await this.jobFetcherService.fetchJobs();

      // Transform jobs properly
      const transformedJobs = jobs.map((job) =>
        this.jobTransformerService.transformJob(job, job.provider),
      );

      // Store transformed jobs
      await this.jobStorageService.storeJobs(transformedJobs);
    } catch (error) {
      this.logger.error(`Failed to fetch and store jobs: ${error.message}`);
      throw new ApiException(
        `Failed to fetch and store jobs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getJobs(filters: {
    title?: string;
    location?: string;
    salaryMin?: number;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const query = this.jobRepository.createQueryBuilder('job');

    if (filters.title) {
      query.andWhere('LOWER(job.title) LIKE LOWER(:title)', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.location) {
      query.andWhere('LOWER(job.location) LIKE LOWER(:location)', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.salaryMin) {
      query.andWhere('job.salaryMin >= :salaryMin', {
        salaryMin: filters.salaryMin,
      });
    }

    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 10;
    const offset = (page - 1) * limit;

    query.skip(offset).take(limit);

    const [jobs, total] = await query.getManyAndCount();

    return {
      jobs,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
