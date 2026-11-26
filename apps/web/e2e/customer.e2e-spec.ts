import { expect, test } from '@playwright/test';

test('shows the seeded customer their battery', async ({ page }) => {
  await page.goto('/customer/00000000-0000-0000-0000-000000000001');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Ada Lovelace' }),
  ).toBeVisible();
  await expect(page.getByRole('definition')).toHaveText([
    'Garage battery',
    'Powercell 10',
    'PC-0001',
    '10 kWh',
    '5 kW',
  ]);
});

test('shows the not-found page for an unknown customer', async ({ page }) => {
  await page.goto('/customer/00000000-0000-0000-0000-000000000099');

  await expect(
    page.getByRole('heading', { name: 'This page could not be found.' }),
  ).toBeVisible();
});
