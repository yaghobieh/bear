import { create } from '@storybook/theming';

export const bearLightTheme = create({
  base: 'light',
  brandTitle: 'Bear UI',
  brandUrl: '/',
  brandTarget: '_self',
  brandImage: '/bear.svg',
  colorPrimary: '#ec4899',
  colorSecondary: '#ec4899',
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e4e4e7',
  appBorderRadius: 8,
  textColor: '#18181b',
  textMutedColor: '#71717a',
  barTextColor: '#3f3f46',
  barSelectedColor: '#ec4899',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#d4d4d8',
  inputTextColor: '#18181b',
});

export const bearDarkTheme = create({
  base: 'dark',
  brandTitle: 'Bear UI',
  brandUrl: '/',
  brandTarget: '_self',
  brandImage: '/bear.svg',
  colorPrimary: '#ec4899',
  colorSecondary: '#ec4899',
  appBg: '#09090b',
  appContentBg: '#111113',
  appPreviewBg: '#09090b',
  appBorderColor: '#27272a',
  appBorderRadius: 8,
  textColor: '#fafafa',
  textMutedColor: '#a1a1aa',
  barTextColor: '#f4f4f5',
  barSelectedColor: '#ec4899',
  barBg: '#09090b',
  inputBg: '#18181b',
  inputBorder: '#3f3f46',
  inputTextColor: '#fafafa',
});

export const bearStorybookTheme = bearLightTheme;
