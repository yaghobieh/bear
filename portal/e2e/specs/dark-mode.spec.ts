import { test, expect } from '@playwright/test';
import { DARK_MODE_SAMPLE_ROUTES } from '../helpers/routes';
import { enableDarkMode, enableLightMode, isDarkModeActive } from '../helpers/theme';

for (const route of DARK_MODE_SAMPLE_ROUTES) {
  test(`[dark-mode] ${route} — dark class applied`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });

    await enableDarkMode(page);

    const dark = await isDarkModeActive(page);
    expect(dark, `${route} html element missing .dark class after enabling dark mode`).toBe(true);

    await expect(page.locator('body'), `${route} body not visible in dark mode`).toBeVisible();

    const criticalErrors: string[] = [];
    page.on('pageerror', (err) => criticalErrors.push(err.message));

    await page.waitForTimeout(500);

    expect(
      criticalErrors.filter((e) => !e.includes('ResizeObserver')),
      `${route} has errors in dark mode`
    ).toHaveLength(0);
  });

  test(`[dark-mode] ${route} — light mode restores correctly`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });

    await enableDarkMode(page);
    await enableLightMode(page);

    const dark = await isDarkModeActive(page);
    expect(dark, `${route} still has .dark class after switching back to light`).toBe(false);
  });
}

test('[dark-mode] theme persists across navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await enableDarkMode(page);

  await page.goto('/components/button', { waitUntil: 'networkidle' });

  const dark = await isDarkModeActive(page);
  expect(dark, 'Dark mode did not persist after navigation').toBe(true);
});
