import { JobTransformerService } from './job-transformer.service';

describe('JobTransformerService', () => {
  let transformerService: JobTransformerService;

  beforeEach(() => {
    transformerService = new JobTransformerService();
  });

  it('should transform provider1 job correctly', () => {
    const provider1Job = {
      jobId: '123',
      title: 'Software Engineer',
      details: {
        location: 'San Francisco',
        type: 'Full-time',
        salaryRange: '$80k-$100k',
      },
      company: {
        name: 'Tech Corp',
        industry: 'IT',
      },
      skills: ['JavaScript', 'Node.js'],
      postedDate: '2024-03-04T00:00:00Z',
    };

    const result = transformerService.transformJob(provider1Job, 'provider1');

    expect(result).toEqual({
      externalId: '123',
      title: 'Software Engineer',
      location: 'San Francisco',
      type: 'Full-time',
      company: 'Tech Corp',
      industry: 'IT',
      salaryMin: 80000,
      salaryMax: 100000,
      currency: 'USD',
      skills: ['JavaScript', 'Node.js'],
      postedDate: new Date('2024-03-04T00:00:00Z'),
    });
  });

  it('should transform provider2 job correctly', () => {
    const provider2Job = {
      jobId: '456',
      position: 'Backend Developer',
      location: { city: 'New York', state: 'NY' },
      employer: { companyName: 'Startup Inc' },
      compensation: { min: 70000, max: 90000, currency: 'USD' },
      requirements: { technologies: ['TypeScript', 'NestJS'] },
      datePosted: '2024-03-03T00:00:00Z',
    };

    const result = transformerService.transformJob(provider2Job, 'provider2');

    expect(result).toEqual({
      externalId: '456',
      title: 'Backend Developer',
      location: 'New York, NY',
      type: 'NOT SPECIFIED',
      company: 'Startup Inc',
      industry: 'NOT SPECIFIED',
      salaryMin: 70000,
      salaryMax: 90000,
      currency: 'USD',
      skills: ['TypeScript', 'NestJS'],
      postedDate: new Date('2024-03-03T00:00:00Z'),
    });
  });

  it('should throw an error for an unknown provider', () => {
    const job = { jobId: '999' };

    expect(() => transformerService.transformJob(job, 'unknown')).toThrowError(
      'No transformer found for provider: unknown',
    );
  });
});
