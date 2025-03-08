import { Module } from '@nestjs/common';
import { JobsCronService } from './cron.service';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [JobModule],
  providers: [JobsCronService],
  exports: [JobsCronService],
})
export class CronModule {}
