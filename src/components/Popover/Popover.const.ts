import { ELEVEN_THOUSAND, EIGHT } from '@constants';

export const POPOVER_ROOT_CLASS = 'Bear-Popover';
export const POPOVER_Z_INDEX = ELEVEN_THOUSAND;
export const POPOVER_DEFAULT_OFFSET = EIGHT;

export const POPOVER_EFFECT_CLASS_MAP: Record<string, string> = {
  scale: 'animate-scale-in',
  fade: 'animate-fade-in',
  'slide-down': 'animate-grow-up',
  fold: 'animate-alert-dialog-in',
  none: '',
};

export const PLACEMENT_BOTTOM = 'bottom';
export const PLACEMENT_TOP = 'top';
export const PLACEMENT_LEFT = 'left';
export const PLACEMENT_RIGHT = 'right';
export const ALIGN_START = 'start';
export const ALIGN_END = 'end';

export const TRANSFORM_TRANSLATE_X_CENTER = 'translateX(-50%)';
export const TRANSFORM_TRANSLATE_X_END = 'translateX(-100%)';
export const TRANSFORM_TRANSLATE_Y_CENTER = 'translateY(-50%)';
export const TRANSFORM_TRANSLATE_Y_END = 'translateY(-100%)';

export const POPOVER_ARROW_STYLES: Record<string, string> = {
  top: 'bear-top-full bear-left-1/2 -bear-translate-x-1/2 bear-border-t-zinc-700 bear-border-x-transparent bear-border-b-transparent',
  bottom: 'bear-bottom-full bear-left-1/2 -bear-translate-x-1/2 bear-border-b-zinc-700 bear-border-x-transparent bear-border-t-transparent',
  left: 'bear-left-full bear-top-1/2 -bear-translate-y-1/2 bear-border-l-zinc-700 bear-border-y-transparent bear-border-r-transparent',
  right: 'bear-right-full bear-top-1/2 -bear-translate-y-1/2 bear-border-r-zinc-700 bear-border-y-transparent bear-border-l-transparent',
};
