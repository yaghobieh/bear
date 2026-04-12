import type { OTPInputVariant } from './OTPInput.types';

export const OTP_CELL_RECT_CLASSES: Record<'sm' | 'md' | 'lg', { rect: string; circle: string }> = {
  sm: { rect: 'bear-w-8 bear-h-10 bear-text-lg', circle: 'bear-w-10 bear-h-10 bear-text-lg' },
  md: { rect: 'bear-w-10 bear-h-12 bear-text-xl', circle: 'bear-w-12 bear-h-12 bear-text-xl' },
  lg: { rect: 'bear-w-12 bear-h-14 bear-text-2xl', circle: 'bear-w-14 bear-h-14 bear-text-2xl' },
};

export const OTP_VARIANT_FRAME: Record<OTPInputVariant, string> = {
  boxed: 'bear-border bear-rounded-lg',
  outline: 'bear-border-2 bear-rounded-lg',
  underline: 'bear-border-0 bear-border-b-2 bear-rounded-none',
  circle: 'bear-border bear-rounded-full',
};
