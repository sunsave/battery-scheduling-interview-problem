import { render, screen } from '@testing-library/react';
import Home from './page';

it('shows the app name as the main heading', () => {
  render(<Home />);

  expect(
    screen.getByRole('heading', { level: 1, name: 'Battery scheduling' }),
  ).toBeInTheDocument();
});
