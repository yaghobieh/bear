import { BOOLEAN_TRUE, SIZE_LG, SIZE_MD, SIZE_SM, VARIANT_PRIMARY } from '@const';
import type { CompactBearSize } from '@types';

export const BACKTOP_DEFAULTS = {
  BOTTOM: 40,
  RIGHT: 40,
  VISIBLE_AT: 400,
  DURATION: 300,
  SIZE: SIZE_MD,
  VARIANT: VARIANT_PRIMARY,
  ANIMATED: BOOLEAN_TRUE,
};

export const BACKTOP_SIZES = {
  sm: {
    width: 36,
    height: 36,
    iconSize: 16,
  },
  md: {
    width: 44,
    height: 44,
    iconSize: 20,
  },
  lg: {
    width: 52,
    height: 52,
    iconSize: 24,
  },
};

export const BACKTOP_BUTTON_SIZE: Record<CompactBearSize, CompactBearSize> = {
  [SIZE_SM]: SIZE_SM,
  [SIZE_MD]: SIZE_MD,
  [SIZE_LG]: SIZE_LG,
};
