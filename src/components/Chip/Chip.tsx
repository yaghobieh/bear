import { FC } from 'react';
import { ChipProps } from './Chip.types';
import { cn } from '../../utils/cn';

export const Chip: FC<ChipProps> = ({
  children,
  variant = 'filled',
  color = 'default',
  size = 'md',
  icon,
  avatar,
  onDelete,
  onClick,
  disabled = false,
  className,
}) => {
  const colorClasses = {
    filled: {
      default: 'bear-bg-zinc-600 bear-text-white',
      primary: 'bear-bg-pink-500 bear-text-white',
      secondary: 'bear-bg-purple-500 bear-text-white',
      success: 'bear-bg-green-500 bear-text-white',
      warning: 'bear-bg-yellow-500 bear-text-black',
      error: 'bear-bg-red-500 bear-text-white',
      info: 'bear-bg-blue-500 bear-text-white',
    },
    outlined: {
      default: 'bear-border bear-border-zinc-500 bear-text-zinc-300',
      primary: 'bear-border bear-border-pink-500 bear-text-pink-400',
      secondary: 'bear-border bear-border-purple-500 bear-text-purple-400',
      success: 'bear-border bear-border-green-500 bear-text-green-400',
      warning: 'bear-border bear-border-yellow-500 bear-text-yellow-400',
      error: 'bear-border bear-border-red-500 bear-text-red-400',
      info: 'bear-border bear-border-blue-500 bear-text-blue-400',
    },
    soft: {
      default: 'bear-bg-zinc-500/20 bear-text-zinc-300',
      primary: 'bear-bg-pink-500/20 bear-text-pink-400',
      secondary: 'bear-bg-purple-500/20 bear-text-purple-400',
      success: 'bear-bg-green-500/20 bear-text-green-400',
      warning: 'bear-bg-yellow-500/20 bear-text-yellow-400',
      error: 'bear-bg-red-500/20 bear-text-red-400',
      info: 'bear-bg-blue-500/20 bear-text-blue-400',
    },
  };

  const sizeClasses = {
    sm: 'bear-h-6 bear-text-xs bear-px-2 bear-gap-1',
    md: 'bear-h-8 bear-text-sm bear-px-3 bear-gap-1.5',
    lg: 'bear-h-10 bear-text-base bear-px-4 bear-gap-2',
  };

  const deleteIconSizes = { sm: 'bear-w-3 bear-h-3', md: 'bear-w-4 bear-h-4', lg: 'bear-w-5 bear-h-5' };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bear-inline-flex bear-items-center bear-rounded-full bear-font-medium bear-transition-all',
        sizeClasses[size],
        colorClasses[variant][color],
        onClick && !disabled && 'bear-cursor-pointer hover:bear-opacity-80',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
    >
      {avatar && <span className="bear--ml-1">{avatar}</span>}
      {icon && <span>{icon}</span>}
      <span>{children}</span>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          disabled={disabled}
          className={cn(
            'bear-ml-1 bear-rounded-full bear-p-0.5 hover:bear-bg-black/20 bear-transition-colors',
            disabled && 'bear-cursor-not-allowed'
          )}
        >
          <svg className={deleteIconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Component>
  );
};

