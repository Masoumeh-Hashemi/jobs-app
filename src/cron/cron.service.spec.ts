import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JobsCronService } from './cron.service';
import { JobService } from '../job/job.service';

describe('JobsCronService', () => {
  let jobsCronService: JobsCronService;
  let jobService: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsCronService,
        { provide: JobService, useValue: { fetchAndStoreJobs: jest.fn() } },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('*/5 * * * *') },
        },
      ],
    }).compile();

    jobsCronService = module.get<JobsCronService>(JobsCronService);
    jobService = module.get<JobService>(JobService);
  });

  it('should call fetchAndStoreJobs at the scheduled time', async () => {
    jest.spyOn(jobService, 'fetchAndStoreJobs');

    await jobsCronService.onModuleInit();

    jest.advanceTimersByTime(5 * 60 * 1000); // Simulate 5 minutes passing

    expect(jobService.fetchAndStoreJobs).toHaveBeenCalled();
  });
});
