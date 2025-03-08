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

  async onModuleInit() {
    const cronSchedule = this.configService.get<string>(
      'CRON_SCHEDULE',
      '0 * * * *',
    );

    this.cronSchedule = cronSchedule;
    const intervalMs = convertCronToMilliseconds(this.cronSchedule);
    setInterval(async () => {
      await this.JobService.fetchAndStoreJobs();
    }, intervalMs);
  }
}
