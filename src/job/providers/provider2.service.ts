import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiException } from '../../common/exceptions/api.exception';

@Injectable()
export class Provider2Service {
  private readonly apiUrl = 'https://assignment.devotel.io/api/provider2/jobs';

  constructor(private readonly httpService: HttpService) {}

  async fetchJobs(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));

      const jobsList = response.data.data?.jobsList;

      if (!jobsList) {
        throw new ApiException('No jobs found', HttpStatus.NOT_FOUND);
      }

      const jobs2 = jobsList
        ? Object.entries(jobsList).map(([jobId, jobData]) => ({
            jobId,
            ...(jobData as object),
          }))
        : [];

      return jobs2;
    } catch (error) {
      throw new ApiException(
        'Failed to fetch jobs from Provider2',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
