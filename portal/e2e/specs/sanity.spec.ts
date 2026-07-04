import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../helpers/routes';

for (const route of ALL_ROUTES) {
  test(`[sanity] ${route} renders without crash`, async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(`[page-error] ${err.message}`);
    });

    const response = await page.goto(route, { waitUntil: 'networkidle', timeout: 20000 });

    expect(response?.status(), `${route} returned non-200`).toBeLessThan(400);

    await expect(page.locator('body'), `${route} body should be visible`).toBeVisible();

    const hasPreview = await page.locator('.doc-preview').count();
    if (route.startsWith('/components/')) {
      expect(hasPreview, `${route} missing .doc-preview`).toBeGreaterThan(0);
    }

    const hasPropsTable = await page.locator('.doc-table__th').count();
    if (route.startsWith('/components/')) {
      expect(hasPropsTable, `${route} missing PropsTable headers`).toBeGreaterThan(0);
    }

    const criticalErrors = consoleErrors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('net::ERR') &&
        !e.includes('ResizeObserver')
    );
    expect(criticalErrors, `${route} has console errors: ${criticalErrors.join(', ')}`).toHaveLength(0);
  });
}
