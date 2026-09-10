import {
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  COLOR_SCHEME_SYSTEM,
  LABEL_THEME_DARK,
  LABEL_THEME_LIGHT,
  LABEL_THEME_SYSTEM,
} from '@const';
import type { BearColorScheme } from '../../context/bearProvider.types';
import type { ThemeSwitcherTranslations } from './ThemeSwitcher.types';

export const THEME_SWITCHER_DEFAULT_TRANSLATIONS: ThemeSwitcherTranslations = {
  lightLabel: LABEL_THEME_LIGHT,
  darkLabel: LABEL_THEME_DARK,
  systemLabel: LABEL_THEME_SYSTEM,
};

export const THEME_SWITCHER_OPTIONS: { value: BearColorScheme; labelKey: keyof ThemeSwitcherTranslations }[] = [
  { value: COLOR_SCHEME_LIGHT, labelKey: 'lightLabel' },
  { value: COLOR_SCHEME_DARK, labelKey: 'darkLabel' },
  { value: COLOR_SCHEME_SYSTEM, labelKey: 'systemLabel' },
];
