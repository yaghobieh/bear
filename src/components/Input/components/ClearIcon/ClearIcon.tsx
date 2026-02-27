import { FC } from 'react';
import { cn } from '@utils';

interface ClearIconProps {
  className?: string;
  onClick?: () => void;
}

export const ClearIcon: FC<ClearIconProps> = ({ className, onClick }) => (
  <button
    type="button"
    tabIndex={-1}
    onClick={onClick}
    className={cn(
      'Bear-Input__clear bear-inline-flex bear-items-center bear-justify-center',
      'bear-rounded-full bear-w-4 bear-h-4 bear-bg-gray-300 dark:bear-bg-gray-600',
      'hover:bear-bg-gray-400 dark:hover:bear-bg-gray-500 bear-transition-colors bear-cursor-pointer',
      className
    )}
    aria-label="Clear input"
  >
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="1" y1="1" x2="7" y2="7" />
      <line x1="7" y1="1" x2="1" y2="7" />
    </svg>
  </button>
);

