import { notFound } from 'next/navigation';
import type { Customer } from './customer';

export async function fetchCustomer(id: string): Promise<Customer> {
  const response = await fetch(`${process.env.API_URL}/customers/${id}`);
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Failed to load customer: ${response.status}`);
  }
  return response.json();
}
