import { HttpStatus, Injectable } from '@nestjs/common';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';
import { ApiException } from '../common/exceptions/api.exception';

@Injectable()
export class JobFetcherService {
  constructor(
    private readonly provider1Service: Provider1Service,
    private readonly provider2Service: Provider2Service,
  ) {}

  async fetchJobs(): Promise<any[]> {
    try {
      // Fetch jobs from providers in parallel
      const jobsByProvider = await Promise.all([
        this.fetchFromProvider(this.provider1Service, 'provider1'),
        this.fetchFromProvider(this.provider2Service, 'provider2'),
      ]);

      return jobsByProvider.flat();
    } catch (error) {
      throw new ApiException(
        `Failed to fetch jobs: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async fetchFromProvider(
    providerService,
    provider: string,
  ): Promise<any[]> {
    const jobs = await providerService.fetchJobs();
    return jobs.map((job) => ({ ...job, provider }));
  }
}
