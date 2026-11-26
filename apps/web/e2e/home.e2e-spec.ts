import { expect, test } from '@playwright/test';

test('shows the app name on the home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Battery scheduling' }),
  ).toBeVisible();
});
