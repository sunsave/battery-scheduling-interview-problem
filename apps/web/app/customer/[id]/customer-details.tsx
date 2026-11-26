import type { ReactNode } from 'react';
import type { Battery, Customer } from './customer';

export function CustomerDetails({ customer }: { customer: Customer }) {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {customer.name}
      </h1>
      <section className="rounded-xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
        <h2 className="mb-4 text-lg font-semibold">Your battery</h2>
        {customer.battery ? (
          <BatteryDetails battery={customer.battery} />
        ) : (
          <p className="text-zinc-500">You don&apos;t have a battery yet.</p>
        )}
      </section>
    </>
  );
}

function BatteryDetails({ battery }: { battery: Battery }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
      {battery.nickname && (
        <BatteryDetail term="Nickname">{battery.nickname}</BatteryDetail>
      )}
      <BatteryDetail term="Model">{battery.model}</BatteryDetail>
      <BatteryDetail term="Serial number">{battery.serialNumber}</BatteryDetail>
      <BatteryDetail term="Capacity">{battery.capacityKwh} kWh</BatteryDetail>
      <BatteryDetail term="Export limit">
        {battery.exportLimitKw} kW
      </BatteryDetail>
    </dl>
  );
}

function BatteryDetail({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <>
      <dt className="text-sm text-zinc-500">{term}</dt>
      <dd className="font-medium">{children}</dd>
    </>
  );
}
