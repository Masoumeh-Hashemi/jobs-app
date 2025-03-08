import { HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiException } from '../../common/exceptions/api.exception';

@Injectable()
export class Provider1Service {
  private readonly apiUrl = 'https://assignment.devotel.io/api/provider1/jobs';

  constructor(private readonly httpService: HttpService) {}

  async fetchJobs(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));
      return response.data.jobs; // API 1 returns jobs in 'jobs' array
    } catch (error) {
      throw new ApiException(
        'Failed to fetch jobs from Provider1',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
