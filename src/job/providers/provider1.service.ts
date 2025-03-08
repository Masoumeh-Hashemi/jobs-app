import { BadGatewayException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class Provider1Service {
  private readonly apiUrl = 'https://assignment.devotel.io/api/provider1/jobs';

  constructor(private readonly httpService: HttpService) {}

  async fetchJobs(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));
      return response.data.jobs;
    } catch (error) {
      throw new BadGatewayException('Failed to fetch jobs from Provider1');
    }
  }
}
