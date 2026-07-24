import type { Page } from '@playwright/test';

const PORTAL_STORAGE_KEY = 'bear-portal-theme';
const BEAR_STORAGE_KEY = 'bear-theme-mode';

export async function enableDarkMode(page: Page): Promise<void> {
  await page.evaluate(
    ({ portalKey, bearKey }) => {
      localStorage.setItem(portalKey, 'dark');
      localStorage.setItem(bearKey, 'dark');
      document.documentElement.classList.add('dark');
    },
    { portalKey: PORTAL_STORAGE_KEY, bearKey: BEAR_STORAGE_KEY }
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
}

export async function enableLightMode(page: Page): Promise<void> {
  await page.evaluate(
    ({ portalKey, bearKey }) => {
      localStorage.setItem(portalKey, 'light');
      localStorage.setItem(bearKey, 'light');
      document.documentElement.classList.remove('dark');
    },
    { portalKey: PORTAL_STORAGE_KEY, bearKey: BEAR_STORAGE_KEY }
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
}

export async function isDarkModeActive(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.classList.contains('dark'));
}

export async function getBackgroundColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return '';
    return window.getComputedStyle(el).backgroundColor;
  }, selector);
}
