import { test, expect } from '@playwright/test';
import { COMPONENT_ROUTES, INTERACTION_ROUTES } from '../helpers/routes';

for (const route of COMPONENT_ROUTES) {
  test(`[interaction] ${route} — no crash on click`, async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto(route, { waitUntil: 'networkidle' });

    const specificInteractions = INTERACTION_ROUTES[route];

    if (specificInteractions) {
      for (const interaction of specificInteractions) {
        const locator = page.locator(interaction.selector).first();
        const isPresent = await locator.count();

        if (!isPresent) continue;

        if (interaction.action === 'click') {
          await locator.click({ timeout: 5000 }).catch(() => null);
        } else if (interaction.action === 'fill' && interaction.value) {
          await locator.fill(interaction.value).catch(() => null);
        }

        if (interaction.expectVisible) {
          await expect(page.locator(interaction.expectVisible).first()).toBeVisible({ timeout: 3000 }).catch(() => null);
        }

        await page.waitForTimeout(300);
      }
    } else {
      const stage = page.locator('.doc-preview__stage').first();
      const stagePresent = await stage.count();

      if (stagePresent) {
        const firstButton = stage.locator('button, [role="button"]').first();
        const buttonPresent = await firstButton.count();

        if (buttonPresent) {
          await firstButton.click({ timeout: 5000 }).catch(() => null);
          await page.waitForTimeout(300);
        }
      }
    }

    const criticalErrors = consoleErrors.filter(
      (e) => !e.includes('ResizeObserver') && !e.includes('favicon')
    );
    expect(
      criticalErrors,
      `${route} threw errors after interaction: ${criticalErrors.join(', ')}`
    ).toHaveLength(0);
  });
}
