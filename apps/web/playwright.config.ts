import { defineConfig, devices } from '@playwright/test';

const webPort = 3100;
const webUrl = `http://localhost:${webPort}`;
const apiPort = 3101;
const apiUrl = `http://localhost:${apiPort}`;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e-spec.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: webUrl,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: `next build && next start --port ${webPort}`,
      url: webUrl,
      env: { API_URL: apiUrl },
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: 'npm run db:setup && npm run start',
      cwd: '../api',
      url: `${apiUrl}/customers/00000000-0000-0000-0000-000000000001`,
      env: {
        NODE_ENV: 'test',
        PORT: String(apiPort),
        CHECKPOINT_DISABLE: '1',
      },
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
