import type { BearVariant } from '../../types';
import { BUTTON_VARIANT } from './Button.constants';

export const isBuiltInVariant = (variant: string): variant is BearVariant => {
  return variant in BUTTON_VARIANT;
};
