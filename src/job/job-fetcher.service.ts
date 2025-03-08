import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';

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
      throw new InternalServerErrorException(
        `Failed to fetch jobs: ${error.message}`,
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
