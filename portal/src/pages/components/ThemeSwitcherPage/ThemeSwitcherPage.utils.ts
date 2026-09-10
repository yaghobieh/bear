import type { ThemeSwitcherPageScheme } from './ThemeSwitcherPage.types';

export const isThemeSwitcherScheme = (value: string): value is ThemeSwitcherPageScheme =>
  value === 'light' || value === 'dark' || value === 'system';
