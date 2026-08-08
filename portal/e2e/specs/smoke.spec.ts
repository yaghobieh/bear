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

test('[smoke] RTL direction applies from Bear direction storage', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('bear-direction', 'rtl');
  });
  await page.goto('/components/button', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();
  const dir =
    (await page.locator('html').getAttribute('dir')) ||
    (await page.locator('body').getAttribute('dir')) ||
    (await page.locator('[dir]').first().getAttribute('dir'));
  expect(dir).toBe('rtl');
});

test('[smoke] Toast live region announces without focus steal', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('bear-version-seen-1.2.8', 'true');
    localStorage.setItem('bear-cookie-consent', 'accepted');
  });
  await page.goto('/components/toast', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();

  const dismiss = page.getByRole('button', { name: /get started|accept cookies|reject/i }).first();
  if (await dismiss.isVisible().catch(() => false)) {
    await dismiss.click();
  }

  const trigger = page.getByRole('button', { name: /success toast|info toast|show toast/i }).first();
  await expect(trigger).toBeVisible({ timeout: 10000 });
  await trigger.click();

  const live = page.locator('.Bear-Toast[aria-live="polite"], .Bear-Toast[aria-live="assertive"]').first();
  await expect(live).toBeVisible({ timeout: 5000 });
  const role = await live.getAttribute('role');
  expect(role === 'status' || role === 'alert').toBeTruthy();
  await expect(live).not.toBeFocused();
});
