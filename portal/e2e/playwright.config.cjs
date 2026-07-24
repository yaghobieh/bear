// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const isSmoke = process.env.BEAR_E2E_SMOKE === '1';

module.exports = defineConfig({
  testDir: './specs',
  testMatch: isSmoke ? ['smoke.spec.ts'] : undefined,
  outputDir: '../../Sanity/playwright-results',
  reporter: [
    ['list'],
    ['json', { outputFile: '../../Sanity/playwright-report.json' }],
  ],
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run build --prefix .. && npm run dev:e2e',
    cwd: __dirname + '/..',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  workers: isSmoke ? 2 : 4,
});
