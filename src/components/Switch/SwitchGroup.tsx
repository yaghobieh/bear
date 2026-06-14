import { cn } from '@utils';
import type { SwitchGroupProps } from './Switch.types';
import {
  SWITCH_THUMB_OFFSET_PX,
  SWITCH_GROUP_ROOT,
  SWITCH_GROUP_VERTICAL,
  SWITCH_GROUP_DISABLED,
  SWITCH_GROUP_OPTION,
  SWITCH_GROUP_OPTION_ACTIVE,
  SWITCH_GROUP_OPTION_INACTIVE,
} from './Switch.const';

export const SwitchGroup = (props: SwitchGroupProps) => {
  const {
    value,
    options,
    onChange,
    orientation = 'horizontal',
    disabled = false,
    className,
    testId,
    'aria-label': ariaLabel = 'Switch group',
  } = props;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        SWITCH_GROUP_ROOT,
        orientation === 'vertical' && SWITCH_GROUP_VERTICAL,
        disabled && SWITCH_GROUP_DISABLED,
        className
      )}
      style={{ gap: `${SWITCH_THUMB_OFFSET_PX}px` }}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled || option.disabled}
            className={cn(SWITCH_GROUP_OPTION, isActive ? SWITCH_GROUP_OPTION_ACTIVE : SWITCH_GROUP_OPTION_INACTIVE)}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
