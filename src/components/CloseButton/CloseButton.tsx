import { FC } from 'react';
import { cn } from '@utils';
import type { CloseButtonProps } from './CloseButton.types';

const SIZE_MAP: Record<string, { btn: string; icon: number }> = {
  xs: { btn: 'bear-w-5 bear-h-5', icon: 10 },
  sm: { btn: 'bear-w-7 bear-h-7', icon: 14 },
  md: { btn: 'bear-w-8 bear-h-8', icon: 16 },
  lg: { btn: 'bear-w-10 bear-h-10', icon: 18 },
  xl: { btn: 'bear-w-12 bear-h-12', icon: 20 },
};

export const CloseButton: FC<CloseButtonProps> = ({
  onClick,
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel = 'Close',
  className,
  testId,
}) => {
  const { btn, icon } = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        'Bear-CloseButton',
        'bear-inline-flex bear-items-center bear-justify-center bear-rounded-md',
        'bear-text-gray-400 dark:bear-text-zinc-500',
        'hover:bear-text-gray-600 dark:hover:bear-text-white',
        'hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700',
        'bear-transition-colors bear-cursor-pointer',
        'disabled:bear-opacity-40 disabled:bear-cursor-not-allowed',
        btn,
        className,
      )}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default CloseButton;
