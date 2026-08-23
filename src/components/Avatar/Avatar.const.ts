import { AVATAR_ALT, AVATAR_MAX_INITIALS, AVATAR_VARIANT_CIRCLE, SIZE_MD } from '@const';

export const AVATAR_SIZE = {
  xs: 'bear-w-6 bear-h-6 bear-text-xs',
  sm: 'bear-w-8 bear-h-8 bear-text-sm',
  md: 'bear-w-10 bear-h-10 bear-text-base',
  lg: 'bear-w-12 bear-h-12 bear-text-lg',
  xl: 'bear-w-16 bear-h-16 bear-text-xl',
  '2xl': 'bear-w-20 bear-h-20 bear-text-2xl',
} as const;

export const AVATAR_VARIANT = {
  circle: 'bear-rounded-full',
  rounded: 'bear-rounded-lg',
  square: 'bear-rounded-none',
} as const;

export const AVATAR_STATUS = {
  online: 'bear-bg-green-500',
  offline: 'bear-bg-gray-400',
  away: 'bear-bg-yellow-500',
  busy: 'bear-bg-red-500',
} as const;

export const AVATAR_DEFAULTS = {
  SIZE: SIZE_MD,
  VARIANT: AVATAR_VARIANT_CIRCLE,
  ALT: AVATAR_ALT,
  MAX_INITIALS: AVATAR_MAX_INITIALS,
};
