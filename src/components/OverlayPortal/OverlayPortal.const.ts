import type { TransitionName } from '../Transition/Transition.types';
import type { OverlayOpenEffect } from '@hooks/useFixedAnchorPosition';
import {
  OVERLAY_OPEN_EFFECT_ELASTIC,
  OVERLAY_OPEN_EFFECT_EXPAND,
  OVERLAY_OPEN_EFFECT_FADE,
  OVERLAY_OPEN_EFFECT_FOLD,
  OVERLAY_OPEN_EFFECT_NONE,
  OVERLAY_OPEN_EFFECT_REVEAL,
  OVERLAY_OPEN_EFFECT_SCALE,
  OVERLAY_OPEN_EFFECT_SLIDE_DOWN,
} from '@hooks/useFixedAnchorPosition';

export { OVERLAY_OPEN_EFFECT_NONE };

export const OVERLAY_EFFECT_TRANSITION: Record<
  Exclude<OverlayOpenEffect, typeof OVERLAY_OPEN_EFFECT_NONE>,
  TransitionName
> = {
  [OVERLAY_OPEN_EFFECT_FADE]: OVERLAY_OPEN_EFFECT_FADE,
  [OVERLAY_OPEN_EFFECT_SLIDE_DOWN]: OVERLAY_OPEN_EFFECT_SLIDE_DOWN,
  [OVERLAY_OPEN_EFFECT_SCALE]: OVERLAY_OPEN_EFFECT_SCALE,
  [OVERLAY_OPEN_EFFECT_FOLD]: OVERLAY_OPEN_EFFECT_FOLD,
  [OVERLAY_OPEN_EFFECT_ELASTIC]: OVERLAY_OPEN_EFFECT_ELASTIC,
  [OVERLAY_OPEN_EFFECT_REVEAL]: OVERLAY_OPEN_EFFECT_REVEAL,
  [OVERLAY_OPEN_EFFECT_EXPAND]: OVERLAY_OPEN_EFFECT_EXPAND,
};

export const OVERLAY_ELASTIC_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const OVERLAY_EXPAND_MS = 375;

export const OVERLAY_PANEL_CLASS = 'Bear-Overlay';

export const OVERLAY_EFFECT_CLASS_MAP: Record<string, string> = {
  scale: 'animate-scale-in',
  fade: 'animate-fade-in',
  'slide-down': 'animate-grow-up',
  fold: 'animate-alert-dialog-in',
  elastic: 'animate-overlay-elastic',
  reveal: 'animate-overlay-reveal',
  expand: 'animate-overlay-expand',
  none: '',
};
