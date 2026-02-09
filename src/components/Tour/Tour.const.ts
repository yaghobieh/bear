import type { TourPlacement } from './Tour.types';

export const TOUR_DEFAULTS = {
  SHOW_INDICATORS: true,
  SHOW_CLOSE_BUTTON: true,
  SHOW_SKIP_BUTTON: true,
  SHOW_PREV_BUTTON: true,
  FINISH_TEXT: 'Finish',
  SKIP_TEXT: 'Skip',
  NEXT_TEXT: 'Next',
  PREV_TEXT: 'Back',
  MASK_OPACITY: 0.5,
  MASK_COLOR: '#000000',
  SPOTLIGHT_PADDING: 8,
  ANIMATED: true,
  PLACEMENT: 'bottom' as TourPlacement,
} as const;

export const TOUR_Z_INDEX = {
  OVERLAY: 99990,
  SPOTLIGHT: 99991,
  TOOLTIP: 99992,
} as const;

export const TOUR_TOOLTIP_OFFSET = 12;

export const TOUR_PLACEMENT_STYLES: Record<TourPlacement, { transform: string }> = {
  'top': { transform: 'translate(-50%, -100%)' },
  'top-start': { transform: 'translate(0, -100%)' },
  'top-end': { transform: 'translate(-100%, -100%)' },
  'bottom': { transform: 'translate(-50%, 0)' },
  'bottom-start': { transform: 'translate(0, 0)' },
  'bottom-end': { transform: 'translate(-100%, 0)' },
  'left': { transform: 'translate(-100%, -50%)' },
  'left-start': { transform: 'translate(-100%, 0)' },
  'left-end': { transform: 'translate(-100%, -100%)' },
  'right': { transform: 'translate(0, -50%)' },
  'right-start': { transform: 'translate(0, 0)' },
  'right-end': { transform: 'translate(0, -100%)' },
};
