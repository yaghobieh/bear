import type { Page } from '@playwright/test';

const STORAGE_KEY = 'bear-portal-theme';

export async function enableDarkMode(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'dark');
  }, STORAGE_KEY);
  await page.reload({ waitUntil: 'networkidle' });
}

export async function enableLightMode(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'light');
  }, STORAGE_KEY);
  await page.reload({ waitUntil: 'networkidle' });
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
