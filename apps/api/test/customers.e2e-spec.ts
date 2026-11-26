import { afterAll, beforeAll, beforeEach, expect, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { resetDatabase } from './reset-database.js';

let app: INestApplication<App>;
let prisma: PrismaService;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication({ logger: false });
  await app.init();
  prisma = app.get(PrismaService);
});

beforeEach(async () => {
  await resetDatabase(prisma);
});

afterAll(async () => {
  await app.close();
});

it('GET /customers/:id returns the customer and their battery', async () => {
  await prisma.customer.create({
    data: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Ada Lovelace',
      battery: {
        create: {
          serialNumber: 'PC-0001',
          model: 'Powercell 10',
          capacityKwh: 10,
          nickname: 'Garage battery',
          exportLimitKw: 5,
        },
      },
    },
  });

  const response = await request(app.getHttpServer())
    .get('/customers/00000000-0000-0000-0000-000000000001')
    .expect(200);

  expect(response.body).toEqual({
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Ada Lovelace',
    battery: {
      serialNumber: 'PC-0001',
      model: 'Powercell 10',
      capacityKwh: 10,
      nickname: 'Garage battery',
      exportLimitKw: 5,
    },
  });
});

it('GET /customers/:id returns 404 when the customer does not exist', async () => {
  await request(app.getHttpServer())
    .get('/customers/99999999-9999-9999-9999-999999999999')
    .expect(404);
});
