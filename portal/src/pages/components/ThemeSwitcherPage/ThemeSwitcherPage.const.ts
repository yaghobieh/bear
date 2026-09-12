import type { PropRow } from '@/components/PropsTable';

export const THEME_SWITCHER_PROPS: PropRow[] = [
  { name: 'value', type: "'light' | 'dark' | 'system'", description: 'Controlled color scheme' },
  { name: 'onChange', type: '(scheme) => void', description: 'Scheme change' },
  { name: 'translations', type: 'Partial<ThemeSwitcherTranslations>', description: 'Light, dark, and system labels' },
];

export const THEME_SWITCHER_CODE = `<ThemeSwitcher />`;
