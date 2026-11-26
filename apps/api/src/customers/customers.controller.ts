import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CustomerResponse } from './customer-response.js';
import { CustomersService } from './customers.service.js';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customersService.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }
}
