import { Suspense } from 'react';
import { CustomerDetails } from './customer-details';
import { fetchCustomer } from './fetch-customer';

export default function CustomerPage({ params }: PageProps<'/customer/[id]'>) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        <LoadedCustomerDetails params={params} />
      </Suspense>
    </main>
  );
}

async function LoadedCustomerDetails({
  params,
}: Pick<PageProps<'/customer/[id]'>, 'params'>) {
  const { id } = await params;
  const customer = await fetchCustomer(id);
  return <CustomerDetails customer={customer} />;
}
