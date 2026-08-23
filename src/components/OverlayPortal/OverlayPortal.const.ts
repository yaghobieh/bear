import type { TransitionName } from '../Transition/Transition.types';
import type { OverlayOpenEffect } from '@hooks/useFixedAnchorPosition';
import {
  OVERLAY_OPEN_EFFECT_FADE,
  OVERLAY_OPEN_EFFECT_NONE,
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
};
