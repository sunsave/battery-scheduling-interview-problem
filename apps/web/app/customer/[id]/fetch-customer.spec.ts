/**
 * @jest-environment node
 */
import { notFound } from 'next/navigation';
import { fetchCustomer } from './fetch-customer';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

let fetchSpy: jest.SpiedFunction<typeof fetch>;

beforeEach(() => {
  process.env.API_URL = 'http://api.test';
  fetchSpy = jest.spyOn(globalThis, 'fetch');
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.mocked(notFound).mockClear();
  delete process.env.API_URL;
});

it('fetches the customer from the API', async () => {
  fetchSpy.mockResolvedValue(
    Response.json({
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Ada Lovelace',
      battery: {
        serialNumber: 'PC-0001',
        model: 'Powercell 10',
        capacityKwh: 10,
        nickname: 'Garage battery',
        exportLimitKw: 5,
      },
    }),
  );

  const customer = await fetchCustomer('00000000-0000-0000-0000-000000000001');

  expect(fetchSpy).toHaveBeenCalledWith(
    'http://api.test/customers/00000000-0000-0000-0000-000000000001',
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

it('shows the not-found page when the API does not know the customer', async () => {
  fetchSpy.mockResolvedValue(
    Response.json({ statusCode: 404 }, { status: 404 }),
  );

  await expect(
    fetchCustomer('00000000-0000-0000-0000-000000000099'),
  ).rejects.toThrow('NEXT_NOT_FOUND');
  expect(notFound).toHaveBeenCalled();
});

it('throws when the API fails', async () => {
  fetchSpy.mockResolvedValue(
    Response.json({ statusCode: 500 }, { status: 500 }),
  );

  await expect(
    fetchCustomer('00000000-0000-0000-0000-000000000001'),
  ).rejects.toThrow('Failed to load customer: 500');
});
