import { createContext, useContext, useState, Children, isValidElement, cloneElement } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import type {
  ToggleButtonProps,
  ToggleButtonGroupProps,
  ToggleButtonContextValue,
} from './ToggleButton.types';
import {
  TOGGLE_BUTTON_BASE_CLASSES,
  TOGGLE_BUTTON_GROUP_BASE_CLASSES,
  TOGGLE_BUTTON_GROUP_ROOT_CLASS,
  TOGGLE_BUTTON_ROOT_CLASS,
  TOGGLE_BUTTON_SELECTED_CLASSES,
  TOGGLE_BUTTON_SIZE_CLASSES,
} from './ToggleButton.const';

const ToggleButtonContext = createContext<ToggleButtonContextValue | null>(null);

const useToggleButtonContext = () => {
  const context = useContext(ToggleButtonContext);
  return context;
};

export const ToggleButton = ({
  value,
  selected: selectedProp,
  size: sizeProp,
  fullWidth = false,
  disabled: disabledProp = false,
  className,
  children,
  id,
  testId,
  onClick,
  ...props
}: ToggleButtonProps) => {
  const generatedId = useBearId('ToggleButton');
  const domId = resolveBearId(id, generatedId);

  const context = useToggleButtonContext();
  const size = sizeProp ?? context?.size ?? 'md';
  const disabled = disabledProp || context?.disabled || false;
  const selected = selectedProp ?? (context?.selectedValues.includes(value) ?? false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      context?.toggleValue(value);
    }
    onClick?.(event);
  };

  return (
    <button
      type="button"
      id={domId}
      data-testid={testId}
      aria-pressed={selected}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        TOGGLE_BUTTON_ROOT_CLASS,
        TOGGLE_BUTTON_BASE_CLASSES,
        TOGGLE_BUTTON_SIZE_CLASSES[size],
        selected && TOGGLE_BUTTON_SELECTED_CLASSES,
        fullWidth && 'bear-flex-1',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const normalizeValues = (value: string | string[] | undefined): string[] => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export const ToggleButtonGroup = ({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = true,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
  children,
  id,
  testId,
}: ToggleButtonGroupProps) => {
  const generatedId = useBearId('ToggleButtonGroup');
  const domId = resolveBearId(id, generatedId);
  const [internalValue, setInternalValue] = useState<string[]>(() => normalizeValues(defaultValue));
  const selectedValues = controlledValue !== undefined ? normalizeValues(controlledValue) : internalValue;

  const toggleValue = (itemValue: string) => {
    let next: string[];
    if (exclusive) {
      next = [itemValue];
    } else {
      next = selectedValues.includes(itemValue)
        ? selectedValues.filter((v) => v !== itemValue)
        : [...selectedValues, itemValue];
    }
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onChange?.(exclusive ? next[0] ?? '' : next);
  };

  const contextValue: ToggleButtonContextValue = {
    selectedValues,
    toggleValue,
    size,
    disabled,
  };

  return (
    <ToggleButtonContext.Provider value={contextValue}>
      <div
        id={domId}
        data-testid={testId}
        role="group"
        className={cn(
          TOGGLE_BUTTON_GROUP_ROOT_CLASS,
          TOGGLE_BUTTON_GROUP_BASE_CLASSES,
          fullWidth && 'bear-w-full',
          disabled && 'bear-opacity-50 bear-pointer-events-none',
          className
        )}
      >
        {Children.map(children, (child) => {
          if (!isValidElement<ToggleButtonProps>(child)) {
            return child;
          }
          return cloneElement(child, {
            fullWidth: child.props.fullWidth ?? fullWidth,
          });
        })}
      </div>
    </ToggleButtonContext.Provider>
  );
};
