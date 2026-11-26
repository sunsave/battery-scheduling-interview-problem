import { beforeEach, expect, it, jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CustomersModule } from './customers.module.js';
import { CustomersService } from './customers.service.js';

const findUniqueCustomer = jest.fn<() => Promise<unknown>>();
let service: CustomersService;

beforeEach(async () => {
  findUniqueCustomer.mockReset();
  const moduleRef = await Test.createTestingModule({
    imports: [PrismaModule, CustomersModule],
  })
    .overrideProvider(PrismaService)
    .useValue({ customer: { findUnique: findUniqueCustomer } })
    .compile();
  service = moduleRef.get(CustomersService);
});

it('returns the customer and their battery', async () => {
  findUniqueCustomer.mockResolvedValue({
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Ada Lovelace',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    battery: {
      id: 'b0000000-0000-0000-0000-000000000001',
      customerId: '00000000-0000-0000-0000-000000000001',
      serialNumber: 'PC-0001',
      model: 'Powercell 10',
      capacityKwh: 10,
      nickname: 'Garage battery',
      exportLimitKw: 5,
    },
  });

  const customer = await service.findById(
    '00000000-0000-0000-0000-000000000001',
  );

  expect(customer).toEqual({
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

it('returns a null battery when the customer has no battery', async () => {
  findUniqueCustomer.mockResolvedValue({
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Grace Hopper',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    battery: null,
  });

  const customer = await service.findById(
    '00000000-0000-0000-0000-000000000004',
  );

  expect(customer).toEqual({
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Grace Hopper',
    battery: null,
  });
});

it('returns null when the customer does not exist', async () => {
  findUniqueCustomer.mockResolvedValue(null);

  const customer = await service.findById(
    '99999999-9999-9999-9999-999999999999',
  );

  expect(customer).toBeNull();
});
