import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Job API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/job-offers (GET) should return jobs', async () => {
    const res = await request(app.getHttpServer()).get('/api/job-offers');
    expect(res.status).toBe(200);
  });

  it('/api/job-offers/fetch (GET) should trigger job fetching', async () => {
    const res = await request(app.getHttpServer()).get('/api/job-offers/fetch');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Job fetching triggered manually' });
  });

  afterAll(async () => {
    await app.close();
  });
});
