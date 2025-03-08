import { Controller, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Job Offers')
@Controller('api/job-offers')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'salaryMin', required: false, type: Number })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns job offers with pagination',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getJobs(@Query() filters: any) {
    return this.jobService.getJobs(filters);
  }

  @Get('fetch')
  async fetchJobsManually() {
    await this.jobService.fetchAndStoreJobs();
    return { message: 'Job fetching triggered manually' };
  }
}
