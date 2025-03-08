import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobOffer } from './entities/job.entity';
import { Provider1Service } from './providers/provider1.service';
import { Provider2Service } from './providers/provider2.service';
import { HttpModule } from '@nestjs/axios';
import { JobFetcherService } from './job-fetcher.service';
import { JobTransformerService } from './job-transformer.service';
import { JobStorageService } from './job-storage.service';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([JobOffer])],
  controllers: [JobController],
  providers: [
    Provider1Service,
    Provider2Service,
    JobService,
    JobFetcherService, // Ensure this is listed as a provider
    JobTransformerService,
    JobStorageService,
  ],
  exports: [JobService],
})
export class JobModule {}
