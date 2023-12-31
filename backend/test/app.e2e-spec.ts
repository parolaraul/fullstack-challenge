import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const okResponse = {
      status: 'ok',
      info: {},
      error: {},
      details: {},
    };
    return request(app.getHttpServer())
      .get('/health-check')
      .expect(200)
      .expect(okResponse);
  });
});
