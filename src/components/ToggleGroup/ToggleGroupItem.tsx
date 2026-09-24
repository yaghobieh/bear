import { MouseEvent } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import { useToggleGroupContext } from './hooks/useToggleGroupContext';
import {
  SIZE_CLASS_MAP,
  VARIANT_CLASS_MAP,
  TOGGLE_GROUP_TYPE_SINGLE,
  TOGGLE_GROUP_DEFAULT_SIZE,
  TOGGLE_GROUP_DEFAULT_VARIANT,
  COMPONENT_NAME_TOGGLE_GROUP_ITEM,
} from './ToggleGroup.const';
import type { ToggleGroupItemProps } from './ToggleGroup.types';
import { Button } from '../Button';

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const {
    value,
    disabled: itemDisabled = false,
    children,
    className,
    id,
    testId,
    ariaLabel,
    onClick,
    ...rest
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_TOGGLE_GROUP_ITEM);
  const domId = resolveBearId(id, generatedId);
  const context = useToggleGroupContext();

  const isSelected = (() => {
    if (!context) return false;
    if (context.type === TOGGLE_GROUP_TYPE_SINGLE) {
      return context.value === value;
    }
    return Array.isArray(context.value) && context.value.includes(value);
  })();

  const isDisabled = itemDisabled || Boolean(context?.disabled);
  const size = context?.size ?? TOGGLE_GROUP_DEFAULT_SIZE;
  const variant = context?.variant ?? TOGGLE_GROUP_DEFAULT_VARIANT;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && context) {
      context.onItemToggle(value);
    }
    onClick?.(event);
  };

  const variantStyles = VARIANT_CLASS_MAP[variant] ?? VARIANT_CLASS_MAP[TOGGLE_GROUP_DEFAULT_VARIANT];
  const sizeStyles = SIZE_CLASS_MAP[size] ?? SIZE_CLASS_MAP[TOGGLE_GROUP_DEFAULT_SIZE];

  const isSingle = context?.type === TOGGLE_GROUP_TYPE_SINGLE;

  return (
    <Button
      type="button"
      id={domId}
      testId={testId}
      role={isSingle ? 'radio' : 'button'}
      aria-checked={isSingle ? isSelected : undefined}
      aria-pressed={!isSingle ? isSelected : undefined}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={handleClick}
      variant="ghost"
      className={cn(
        'Bear-ToggleGroup__item',
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bear-primary-500)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
        sizeStyles,
        isSelected ? variantStyles.active : variantStyles.base,
        className
      )}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Button>
  );
};
