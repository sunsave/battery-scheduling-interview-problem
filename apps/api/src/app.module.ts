import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, CustomersModule],
})
export class AppModule {}
