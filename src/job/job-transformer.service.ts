import { Injectable } from '@nestjs/common';
import { JobOffer } from './entities/job.entity';

@Injectable()
export class JobTransformerService {
  transformProvider1 = (job: any): Partial<JobOffer> => {
    return {
      externalId: job.jobId,
      title: job.title,
      location: job.details.location,
      type: job.details.type,
      company: job.company.name,
      industry: job.company.industry,
      salaryMin: this.extractMinSalary(job.details.salaryRange),
      salaryMax: this.extractMaxSalary(job.details.salaryRange),
      currency: this.extractCurrency(job.details.salaryRange),
      skills: job.skills,
      postedDate: new Date(job.postedDate),
    };
  };

  transformProvider2 = (job: any): Partial<JobOffer> => {
    return {
      externalId: job.jobId,
      title: job.position,
      location: `${job.location.city}, ${job.location.state}`,
      type: 'NOT SPECIFIED',
      company: job.employer.companyName,
      industry: 'NOT SPECIFIED',
      salaryMin: job.compensation.min,
      salaryMax: job.compensation.max,
      currency: job.compensation.currency,
      skills: job.requirements.technologies,
      postedDate: new Date(job.datePosted),
    };
  };
  private transformers: Record<string, (job: any) => Partial<JobOffer>> = {
    provider1: this.transformProvider1,
    provider2: this.transformProvider2,
  };

  transformJob(job: any, provider: string): Partial<JobOffer> {
    const transformer = this.transformers[provider];

    if (!transformer) {
      throw new Error(`No transformer found for provider: ${provider}`);
    }

    return transformer(job);
  }

  private extractMinSalary(salaryRange: string): number {
    const minSalary = salaryRange.split('-')[0].replace(/\D/g, '');
    return salaryRange.includes('k')
      ? parseInt(minSalary, 10) * 1000
      : parseInt(minSalary, 10);
  }

  private extractMaxSalary(salaryRange: string): number {
    const maxSalary = salaryRange.split('-')[1].replace(/\D/g, '');
    return salaryRange.includes('k')
      ? parseInt(maxSalary, 10) * 1000
      : parseInt(maxSalary, 10);
  }

  private extractCurrency(salaryRange: string): string {
    return salaryRange.includes('$') ? 'USD' : 'Unknown';
  }
}
