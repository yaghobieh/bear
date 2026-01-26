export const spacingToClass = (value: number | string | undefined, prefix: string): string => {
  if (value === undefined) return '';
  if (typeof value === 'number') return `${prefix}-${value}`;
  return `${prefix}-[${value}]`;
};

export const roundedMap: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const shadowMap: Record<string, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

