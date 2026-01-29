import { FC } from 'react';
import { cn } from '@utils';
import type { SwitchProps } from './Switch.types';

// CSS class constants
const SWITCH_ROOT_CLASSES = 'Bear-Switch bear-inline-flex bear-items-center bear-gap-3 bear-cursor-pointer';
const SWITCH_DISABLED_CLASSES = 'bear-opacity-50 bear-cursor-not-allowed';

const SWITCH_TRACK_BASE_CLASSES = 'Bear-Switch__track bear-relative bear-inline-flex bear-items-center bear-shrink-0 bear-rounded-full bear-transition-colors bear-duration-200 focus-within:bear-ring-2 focus-within:bear-ring-pink-500 focus-within:bear-ring-offset-2 focus-within:bear-ring-offset-white dark:focus-within:bear-ring-offset-zinc-900';
const SWITCH_TRACK_CHECKED_CLASSES = 'bear-bg-pink-500';
const SWITCH_TRACK_UNCHECKED_CLASSES = 'bear-bg-gray-300 dark:bear-bg-gray-600';

const SWITCH_THUMB_BASE_CLASSES = 'Bear-Switch__thumb bear-absolute bear-top-0.5 bear-left-0.5 bear-rounded-full bear-bg-white bear-shadow bear-transition-transform bear-duration-200 bear-flex bear-items-center bear-justify-center';

const SWITCH_LABEL_CLASSES = 'Bear-Switch__label bear-text-sm bear-text-gray-700 dark:bear-text-gray-300';

const SWITCH_ICON_CLASSES = 'Bear-Switch__icon bear-flex bear-items-center bear-justify-center';

const sizeClasses = {
  sm: {
    track: 'bear-w-8 bear-h-4',
    thumb: 'bear-w-3 bear-h-3',
    translate: 'bear-translate-x-4',
    iconSize: 8,
  },
  md: {
    track: 'bear-w-11 bear-h-6',
    thumb: 'bear-w-5 bear-h-5',
    translate: 'bear-translate-x-5',
    iconSize: 12,
  },
  lg: {
    track: 'bear-w-14 bear-h-7',
    thumb: 'bear-w-6 bear-h-6',
    translate: 'bear-translate-x-7',
    iconSize: 16,
  },
};

export const Switch: FC<SwitchProps> = ({
  label,
  checked = false,
  onCheckedChange,
  size = 'md',
  disabled = false,
  uncheckedIcon,
  checkedIcon,
  showIconsInThumb = false,
  className,
  testId,
  id,
  ...props
}) => {
  const handleChange = () => {
    if (!disabled) {
      onCheckedChange?.(!checked);
    }
  };

  const sizeConfig = sizeClasses[size];
  const hasIcons = uncheckedIcon || checkedIcon;

  return (
    <label
      id={id}
      data-testid={testId}
      className={cn(
        SWITCH_ROOT_CLASSES,
        disabled && SWITCH_DISABLED_CLASSES,
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
          SWITCH_TRACK_BASE_CLASSES,
          checked ? SWITCH_TRACK_CHECKED_CLASSES : SWITCH_TRACK_UNCHECKED_CLASSES,
          sizeConfig.track
        )}
      >
        {/* Side icons (outside thumb) */}
        {hasIcons && !showIconsInThumb && (
          <>
            <span className={cn(
              SWITCH_ICON_CLASSES,
              'bear-absolute bear-left-1',
              checked ? 'bear-text-white' : 'bear-text-transparent',
              'bear-transition-colors bear-duration-200'
            )}>
              {checkedIcon}
            </span>
            <span className={cn(
              SWITCH_ICON_CLASSES,
              'bear-absolute bear-right-1',
              !checked ? 'bear-text-gray-600 dark:bear-text-gray-400' : 'bear-text-transparent',
              'bear-transition-colors bear-duration-200'
            )}>
              {uncheckedIcon}
            </span>
          </>
        )}
        
        {/* Thumb */}
        <span
          className={cn(
            SWITCH_THUMB_BASE_CLASSES,
            checked && sizeConfig.translate,
            sizeConfig.thumb
          )}
        >
          {/* Icons inside thumb */}
          {hasIcons && showIconsInThumb && (
            <span className={cn(
              SWITCH_ICON_CLASSES,
              checked ? 'bear-text-pink-500' : 'bear-text-gray-400'
            )}>
              {checked ? checkedIcon : uncheckedIcon}
            </span>
          )}
        </span>
      </span>

      {label && (
        <span className={SWITCH_LABEL_CLASSES}>{label}</span>
      )}
    </label>
  );
};

