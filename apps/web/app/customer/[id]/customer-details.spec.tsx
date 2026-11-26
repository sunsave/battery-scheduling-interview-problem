import { render, screen } from '@testing-library/react';
import { CustomerDetails } from './customer-details';

it('shows the customer and all of their battery details', () => {
  render(
    <CustomerDetails
      customer={{
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Ada Lovelace',
        battery: {
          serialNumber: 'PC-0001',
          model: 'Powercell 10',
          capacityKwh: 10,
          nickname: 'Garage battery',
          exportLimitKw: 5,
        },
      }}
    />,
  );

  expect(
    screen.getByRole('heading', { level: 1, name: 'Ada Lovelace' }),
  ).toBeInTheDocument();
  expect(batteryDetailsShown()).toEqual({
    Nickname: 'Garage battery',
    Model: 'Powercell 10',
    'Serial number': 'PC-0001',
    Capacity: '10 kWh',
    'Export limit': '5 kW',
  });
});

it('leaves out the nickname when the battery has none', () => {
  render(
    <CustomerDetails
      customer={{
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Alan Turing',
        battery: {
          serialNumber: 'PC-0002',
          model: 'Powercell 13.5',
          capacityKwh: 13.5,
          nickname: null,
          exportLimitKw: 3.68,
        },
      }}
    />,
  );

  expect(batteryDetailsShown()).toEqual({
    Model: 'Powercell 13.5',
    'Serial number': 'PC-0002',
    Capacity: '13.5 kWh',
    'Export limit': '3.68 kW',
  });
});

it('shows a message instead of battery details when the customer has no battery', () => {
  render(
    <CustomerDetails
      customer={{
        id: '00000000-0000-0000-0000-000000000004',
        name: 'Grace Hopper',
        battery: null,
      }}
    />,
  );

  expect(
    screen.getByRole('heading', { level: 1, name: 'Grace Hopper' }),
  ).toBeInTheDocument();
  expect(screen.getByText("You don't have a battery yet.")).toBeInTheDocument();
  expect(screen.queryAllByRole('term')).toEqual([]);
});

function batteryDetailsShown() {
  const terms = screen.getAllByRole('term');
  const definitions = screen.getAllByRole('definition');
  return Object.fromEntries(
    terms.map((term, index) => [
      term.textContent,
      definitions[index].textContent,
    ]),
  );
}
