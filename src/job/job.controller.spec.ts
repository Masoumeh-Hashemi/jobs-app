import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';

describe('JobController', () => {
  let jobController: JobController;
  let jobService: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: { getJobs: jest.fn(), fetchAndStoreJobs: jest.fn() },
        },
      ],
    }).compile();

    jobController = module.get<JobController>(JobController);
    jobService = module.get<JobService>(JobService);
  });

  it('should return jobs when getJobs is called', async () => {
    const mockJobs = [{ jobId: '1' }];
    jest.spyOn(jobService, 'getJobs').mockResolvedValue(mockJobs);

    const result = await jobController.getJobs({});
    expect(result).toEqual(mockJobs);
  });

  it('should trigger job fetching when fetchJobsManually is called', async () => {
    await jobController.fetchJobsManually();
    expect(jobService.fetchAndStoreJobs).toHaveBeenCalled();
  });
});
