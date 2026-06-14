import { BearIcons } from '@forgedevstack/bear';
import { BEAR_INSTALL_COMMAND } from '@/constants/strings.const';

export const BENTO_ICON_SIZE = 18;

export const BENTO_ICONS = [
  BearIcons.HomeIcon,
  BearIcons.SearchIcon,
  BearIcons.HeartIcon,
  BearIcons.ToggleButtonIcon,
  BearIcons.FormControlIcon,
  BearIcons.SnackbarIcon,
  BearIcons.PaletteIcon,
  BearIcons.BarChartIcon,
] as const;

export const BENTO_INSTALL_COMMAND = BEAR_INSTALL_COMMAND;

export const BENTO_SNACKBAR_OFFSET_PX = 12;
export const BENTO_SNACKBAR_DURATION_MS = 4000;

export const BENTO_SKILLS_LINK = '/skills';
export const BENTO_INSTALL_LINK = '/installation';
