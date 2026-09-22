import { EIGHT, TWO_HUNDRED } from '@constants';

export const T_O_O_L_T_I_P_ROOT_CLASS = 'Bear-Tooltip';

export const TOOLTIP_EFFECT_CLASS_MAP: Record<string, string> = {
  scale: 'animate-scale-in',
  fade: 'animate-fade-in',
  'slide-down': 'animate-grow-up',
  fold: 'animate-alert-dialog-in',
  none: '',
};

export const TOOLTIP_DEFAULT_DELAY = TWO_HUNDRED;
export const TOOLTIP_SPACING = EIGHT;
export const TOOLTIP_VIEWPORT_PADDING = EIGHT;

export const TOOLTIP_POSITION_TOP = 'top';
export const TOOLTIP_POSITION_BOTTOM = 'bottom';
export const TOOLTIP_POSITION_LEFT = 'left';
export const TOOLTIP_POSITION_RIGHT = 'right';
