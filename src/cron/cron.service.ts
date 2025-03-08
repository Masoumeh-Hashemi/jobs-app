import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobService } from '../job/job.service';
import { convertCronToMilliseconds } from '../common/utils/cron.utils';

@Injectable()
export class JobsCronService implements OnModuleInit {
  private cronSchedule: string;

  constructor(
    private readonly JobService: JobService,
    private readonly configService: ConfigService,
  ) {}

  // This method runs once the module is initialized
  async onModuleInit() {
    const cronSchedule = this.configService.get<string>(
      'CRON_SCHEDULE',
      '0 * * * *',
    );

    this.cronSchedule = cronSchedule;
    // Calculate the next run time interval in milliseconds
    const intervalMs = convertCronToMilliseconds(this.cronSchedule);

    // Use setInterval or a similar mechanism to run the job based on this interval
    setInterval(async () => {
      await this.JobService.fetchAndStoreJobs();
    }, intervalMs);
  }
}
