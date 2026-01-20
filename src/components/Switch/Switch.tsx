import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { SwitchProps } from './Switch.types';

const sizeClasses = {
  sm: {
    track: 'bear-w-8 bear-h-4',
    thumb: 'bear-w-3 bear-h-3',
    translate: 'bear-translate-x-4',
  },
  md: {
    track: 'bear-w-11 bear-h-6',
    thumb: 'bear-w-5 bear-h-5',
    translate: 'bear-translate-x-5',
  },
  lg: {
    track: 'bear-w-14 bear-h-7',
    thumb: 'bear-w-6 bear-h-6',
    translate: 'bear-translate-x-7',
  },
};

export const Switch: FC<SwitchProps> = ({
  label,
  checked = false,
  onCheckedChange,
  size = 'md',
  disabled = false,
  className,
  ...props
}) => {
  const handleChange = () => {
    if (!disabled) {
      onCheckedChange?.(!checked);
    }
  };

  return (
    <label
      className={cn(
        'bear-inline-flex bear-items-center bear-gap-3 bear-cursor-pointer',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="bear-sr-only"
        {...props}
      />

      <span
        className={cn(
          'bear-relative bear-inline-flex bear-shrink-0 bear-rounded-full',
          'bear-transition-colors bear-duration-200',
          'focus-within:bear-ring-2 focus-within:bear-ring-bear-500 focus-within:bear-ring-offset-2 focus-within:bear-ring-offset-gray-900',
          checked ? 'bear-bg-bear-500' : 'bear-bg-gray-600',
          sizeClasses[size].track
        )}
      >
        <span
          className={cn(
            'bear-absolute bear-top-0.5 bear-left-0.5 bear-rounded-full bear-bg-white',
            'bear-shadow bear-transition-transform bear-duration-200',
            checked && sizeClasses[size].translate,
            sizeClasses[size].thumb
          )}
        />
      </span>

      {label && (
        <span className="bear-text-sm bear-text-gray-300">{label}</span>
      )}
    </label>
  );
};

