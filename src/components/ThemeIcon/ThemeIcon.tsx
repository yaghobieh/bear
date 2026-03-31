import { FC } from 'react';
import { cn } from '@utils';
import type { ThemeIconProps } from './ThemeIcon.types';

const SIZE_MAP: Record<string, string> = {
  xs: 'bear-w-6 bear-h-6',
  sm: 'bear-w-8 bear-h-8',
  md: 'bear-w-10 bear-h-10',
  lg: 'bear-w-12 bear-h-12',
  xl: 'bear-w-16 bear-h-16',
};

const RADIUS_MAP: Record<string, string> = {
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  xl: 'bear-rounded-xl',
  full: 'bear-rounded-full',
};

const VARIANT_MAP: Record<string, string> = {
  primary: 'bear-bg-pink-500 bear-text-white',
  secondary: 'bear-bg-gray-500 bear-text-white',
  success: 'bear-bg-green-500 bear-text-white',
  danger: 'bear-bg-red-500 bear-text-white',
  warning: 'bear-bg-yellow-500 bear-text-white',
  info: 'bear-bg-blue-500 bear-text-white',
  ghost: 'bear-bg-gray-100 dark:bear-bg-zinc-800 bear-text-gray-600 dark:bear-text-gray-300',
  outline: 'bear-bg-transparent bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-text-gray-600 dark:bear-text-gray-300',
};

export const ThemeIcon: FC<ThemeIconProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  radius = 'md',
  gradient,
  className,
  testId,
}) => {
  const sizeClass = typeof size === 'string' ? SIZE_MAP[size] ?? SIZE_MAP.md : undefined;
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : undefined;
  const radiusClass = RADIUS_MAP[radius] ?? RADIUS_MAP.md;
  const variantClass = gradient ? 'bear-text-white' : VARIANT_MAP[variant] ?? VARIANT_MAP.primary;
  const gradientStyle = gradient
    ? { background: `linear-gradient(${gradient.deg ?? 135}deg, ${gradient.from}, ${gradient.to})` }
    : undefined;

  return (
    <div
      className={cn(
        'Bear-ThemeIcon',
        'bear-inline-flex bear-items-center bear-justify-center bear-shrink-0',
        sizeClass,
        radiusClass,
        variantClass,
        className,
      )}
      style={{ ...sizeStyle, ...gradientStyle }}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default ThemeIcon;
