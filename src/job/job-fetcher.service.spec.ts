import { Test, TestingModule } from '@nestjs/testing';
import { JobFetcherService } from './job-fetcher.service';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';

describe('JobFetcherService', () => {
  let jobFetcherService: JobFetcherService;
  let provider1Service: Provider1Service;
  let provider2Service: Provider2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobFetcherService,
        {
          provide: Provider1Service,
          useValue: { fetchJobs: jest.fn() },
        },
        {
          provide: Provider2Service,
          useValue: { fetchJobs: jest.fn() },
        },
      ],
    }).compile();

    jobFetcherService = module.get<JobFetcherService>(JobFetcherService);
    provider1Service = module.get<Provider1Service>(Provider1Service);
    provider2Service = module.get<Provider2Service>(Provider2Service);
  });

  it('should fetch and merge jobs from both providers', async () => {
    jest
      .spyOn(provider1Service, 'fetchJobs')
      .mockResolvedValue([{ jobId: '1' }]);
    jest
      .spyOn(provider2Service, 'fetchJobs')
      .mockResolvedValue([{ jobId: '2' }]);

    const result = await jobFetcherService.fetchJobs();

    expect(result).toEqual([
      { jobId: '1', provider: 'provider1' },
      { jobId: '2', provider: 'provider2' },
    ]);
  });
});
