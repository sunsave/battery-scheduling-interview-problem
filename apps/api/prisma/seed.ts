import '../src/load-env.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

const customers = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Ada Lovelace',
    battery: {
      serialNumber: 'PC-0001',
      model: 'Powercell 10',
      capacityKwh: 10,
      nickname: 'Garage battery',
      exportLimitKw: 5,
    },
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Alan Turing',
    battery: {
      serialNumber: 'PC-0002',
      model: 'Powercell 13.5',
      capacityKwh: 13.5,
      nickname: null,
      exportLimitKw: 3.68,
    },
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Katherine Johnson',
    battery: {
      serialNumber: 'PC-0003',
      model: 'Powercell 5',
      capacityKwh: 5,
      nickname: 'Utility room',
      exportLimitKw: 3.68,
    },
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Grace Hopper',
    battery: null,
  },
];

const prisma = new PrismaService();

for (const { battery, ...customer } of customers) {
  await prisma.customer.upsert({
    where: { id: customer.id },
    create: customer,
    update: customer,
  });
  if (battery) {
    const batteryWithCustomer = { ...battery, customerId: customer.id };
    await prisma.battery.upsert({
      where: { customerId: customer.id },
      create: batteryWithCustomer,
      update: batteryWithCustomer,
    });
  }
}

await prisma.$disconnect();
