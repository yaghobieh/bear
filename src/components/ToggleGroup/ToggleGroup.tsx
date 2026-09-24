import { useState, useMemo, useCallback, KeyboardEvent } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import { ToggleGroupContext } from './ToggleGroup.context';
import {
  ORIENTATION_CLASS_MAP,
  TOGGLE_GROUP_TYPE_SINGLE,
  TOGGLE_GROUP_TYPE_MULTIPLE,
  TOGGLE_GROUP_ORIENTATION_HORIZONTAL,
  TOGGLE_GROUP_DEFAULT_SIZE,
  TOGGLE_GROUP_DEFAULT_VARIANT,
  COMPONENT_NAME_TOGGLE_GROUP,
} from './ToggleGroup.const';
import type { ToggleGroupProps, ToggleGroupType } from './ToggleGroup.types';
import { ZERO, ONE, EMPTY_STRING } from '@constants';

export const ToggleGroup = (props: ToggleGroupProps) => {
  const {
    type = TOGGLE_GROUP_TYPE_SINGLE,
    value: controlledValue,
    defaultValue,
    onChange,
    onValueChange,
    orientation = TOGGLE_GROUP_ORIENTATION_HORIZONTAL,
    size = TOGGLE_GROUP_DEFAULT_SIZE,
    variant = TOGGLE_GROUP_DEFAULT_VARIANT,
    disabled = false,
    fullWidth = false,
    className,
    children,
    id,
    testId,
    ...rest
  } = props as ToggleGroupProps & { onValueChange?: (val: string | string[]) => void };

  const generatedId = useBearId(COMPONENT_NAME_TOGGLE_GROUP);
  const domId = resolveBearId(id, generatedId);

  const [uncontrolledSingle, setUncontrolledSingle] = useState<string>(() => {
    if (type === TOGGLE_GROUP_TYPE_SINGLE) {
      return (defaultValue as string) ?? EMPTY_STRING;
    }
    return EMPTY_STRING;
  });

  const [uncontrolledMultiple, setUncontrolledMultiple] = useState<string[]>(() => {
    if (type === TOGGLE_GROUP_TYPE_MULTIPLE) {
      return (defaultValue as string[]) ?? [];
    }
    return [];
  });

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled
    ? controlledValue
    : type === TOGGLE_GROUP_TYPE_SINGLE
      ? uncontrolledSingle
      : uncontrolledMultiple;

  const handleToggle = useCallback(
    (itemValue: string) => {
      if (disabled) return;

      if (type === TOGGLE_GROUP_TYPE_SINGLE) {
        const nextValue = currentValue === itemValue ? EMPTY_STRING : itemValue;
        if (!isControlled) {
          setUncontrolledSingle(nextValue);
        }
        (onChange as ((val: string) => void) | undefined)?.(nextValue);
        onValueChange?.(nextValue);
      } else {
        const currentList = Array.isArray(currentValue) ? currentValue : [];
        const nextList = currentList.includes(itemValue)
          ? currentList.filter((v) => v !== itemValue)
          : [...currentList, itemValue];

        if (!isControlled) {
          setUncontrolledMultiple(nextList);
        }
        (onChange as ((val: string[]) => void) | undefined)?.(nextList);
        onValueChange?.(nextList);
      }
    },
    [disabled, type, currentValue, isControlled, onChange, onValueChange]
  );

  const contextValue = useMemo(
    () => ({
      type: type as ToggleGroupType,
      value: currentValue as string | string[],
      onItemToggle: handleToggle,
      size,
      variant,
      disabled,
    }),
    [type, currentValue, handleToggle, size, variant, disabled]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target || target.getAttribute('role') !== 'radio') return;

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]:not([disabled])')
    );
    const currentIndex = items.indexOf(target as HTMLButtonElement);
    if (currentIndex === -1) return;

    const isHorizontal = orientation === TOGGLE_GROUP_ORIENTATION_HORIZONTAL;
    const isForward = (isHorizontal && event.key === 'ArrowRight') || (!isHorizontal && event.key === 'ArrowDown');
    const isBackward = (isHorizontal && event.key === 'ArrowLeft') || (!isHorizontal && event.key === 'ArrowUp');

    let nextIndex = currentIndex;
    if (isForward) nextIndex = (currentIndex + ONE) % items.length;
    else if (isBackward) nextIndex = (currentIndex - ONE + items.length) % items.length;
    else if (event.key === 'Home') nextIndex = ZERO;
    else if (event.key === 'End') nextIndex = items.length - ONE;
    else return;

    event.preventDefault();
    items[nextIndex]?.focus();
  };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        id={domId}
        data-testid={testId}
        role="group"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'Bear-ToggleGroup',
          'inline-flex max-w-full items-center gap-1 rounded-lg border border-[var(--bear-border-subtle)] bg-[var(--bear-surface-base)] p-1',
          ORIENTATION_CLASS_MAP[orientation],
          fullWidth && 'w-full justify-stretch',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};
