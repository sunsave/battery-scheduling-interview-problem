import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CustomerResponse } from './customer-response.js';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CustomerResponse | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { battery: true },
    });
    if (!customer) {
      return null;
    }

    const { battery } = customer;
    return {
      id: customer.id,
      name: customer.name,
      battery: battery && {
        serialNumber: battery.serialNumber,
        model: battery.model,
        capacityKwh: battery.capacityKwh,
        nickname: battery.nickname,
        exportLimitKw: battery.exportLimitKw,
      },
    };
  }
}
