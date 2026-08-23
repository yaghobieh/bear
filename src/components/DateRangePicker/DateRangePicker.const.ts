import { FOUR_HUNDRED_TWENTY, ELEVEN_THOUSAND } from '@const';

export const DATERANGE_DROPDOWN_HEIGHT_PX = FOUR_HUNDRED_TWENTY;

export const DATERANGE_DROPDOWN_Z_INDEX = ELEVEN_THOUSAND;

export const DATERANGE_DROPDOWN_ATTR = 'data-bear-daterangepicker-dropdown';

export const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export const SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4 bear-text-base',
  lg: 'bear-py-2.5 bear-px-5 bear-text-lg',
} as const;
