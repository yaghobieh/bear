import { test, expect } from '@playwright/test';
import { enableDarkMode, isDarkModeActive } from '../helpers/theme';

const SMOKE_ROUTES = ['/', '/components/button', '/components/input', '/components/select', '/theming'];

for (const route of SMOKE_ROUTES) {
  test(`[smoke] ${route} renders`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    expect(response?.status(), `${route} returned non-200`).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
  });
}

test('[smoke] dark class applies from Bear theme storage', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await enableDarkMode(page);
  expect(await isDarkModeActive(page)).toBe(true);
});

test('[smoke] default home renders without crash in light storage', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('bear-portal-theme', 'light');
    localStorage.setItem('bear-theme-mode', 'light');
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();
  expect(await page.locator('html').getAttribute('class')).not.toContain('undefined');
});
