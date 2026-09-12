import { addons } from '@storybook/manager-api';
import { bearDarkTheme, bearLightTheme } from './theme';

const THEME_GLOBAL = 'theme';
const THEME_DARK = 'dark';
const GLOBALS_UPDATED = 'updateGlobals';

const applyTheme = (mode?: string) => {
  addons.setConfig({
    theme: mode === THEME_DARK ? bearDarkTheme : bearLightTheme,
  });
};

addons.setConfig({
  theme: bearLightTheme,
  selectedPanel: 'addon-controls',
});

addons.register('bear-theme-toggle', (api) => {
  applyTheme(api.getGlobals()?.[THEME_GLOBAL] as string | undefined);
  api.on(GLOBALS_UPDATED, (payload: { globals?: Record<string, unknown> }) => {
    applyTheme(payload.globals?.[THEME_GLOBAL] as string | undefined);
  });
});
