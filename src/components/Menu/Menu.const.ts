import { TWELVE_THOUSAND } from '@constants';

export const M_E_N_U_ROOT_CLASS = 'Bear-Menu';

export const MENU_Z_INDEX = TWELVE_THOUSAND;

export const MENU_EFFECT_CLASS_MAP: Record<string, string> = {
  scale: 'animate-scale-in',
  fade: 'animate-fade-in',
  'slide-down': 'animate-grow-up',
  fold: 'animate-alert-dialog-in',
  none: '',
};
