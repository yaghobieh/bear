import type { BearColorScheme } from '../../context/bearProvider.types';

export interface ThemeSwitcherTranslations {
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
}

export interface ThemeSwitcherProps {
  id?: string;
  testId?: string;
  value?: BearColorScheme;
  onChange?: (scheme: BearColorScheme) => void;
  translations?: Partial<ThemeSwitcherTranslations>;
  className?: string;
}
