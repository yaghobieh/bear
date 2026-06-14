import { forwardRef, useEffect, useRef } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import type { CheckboxProps } from './Checkbox.types';
import {
  CHECKBOX_SIZE_CLASSES,
  CHECKBOX_ICON_SIZE,
  CHECKBOX_LABEL_SIZE_CLASSES,
  CHECKBOX_VARIANT_COLORS,
  CHECKBOX_ROOT_CLASSES,
  CHECKBOX_LABEL_CLASSES,
  CHECKBOX_LABEL_DISABLED,
  CHECKBOX_BOX_WRAPPER,
  CHECKBOX_BOX_BASE,
  CHECKBOX_BOX_ERROR_BORDER,
  CHECKBOX_BOX_DEFAULT_BORDER,
  CHECKBOX_BOX_CHECKED,
  CHECKBOX_BOX_HOVER,
  CHECKBOX_LABEL_TEXT,
  CHECKBOX_LABEL_ERROR,
  CHECKBOX_HELPER_BASE,
  CHECKBOX_HELPER_ERROR,
  CHECKBOX_HELPER_DEFAULT,
  CHECKBOX_ERROR_COLOR,
  DEFAULT_CHECKBOX_INDICATOR,
} from './Checkbox.const';
import { CheckboxIndicatorIcon } from './helpers';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, forwardedRef) => {
  const {
    label,
    size = 'md',
    variant = 'primary',
    color,
    checked,
    defaultChecked,
    indeterminate = false,
    indicator = DEFAULT_CHECKBOX_INDICATOR,
    disabled = false,
    error = false,
    helperText,
    className,
    id,
    testId,
    onChange,
    ...rest
  } = props;

  const internalRef = useRef<HTMLInputElement>(null);
  const ref = forwardedRef || internalRef;
  const generatedId = useBearId('Checkbox');
  const domId = resolveBearId(id, generatedId);

  const accentColor = color ?? CHECKBOX_VARIANT_COLORS[variant];
  const iconSize = CHECKBOX_ICON_SIZE[size];
  const isChecked = checked ?? defaultChecked;

  useEffect(() => {
    if (typeof ref === 'object' && ref?.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  return (
    <div className={cn(CHECKBOX_ROOT_CLASSES, className)}>
      <label
        className={cn(
          CHECKBOX_LABEL_CLASSES,
          disabled && CHECKBOX_LABEL_DISABLED
        )}
      >
        <div className={CHECKBOX_BOX_WRAPPER}>
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            id={domId}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className="bear-sr-only"
            data-testid={testId}
            {...rest}
          />
          <div
            className={cn(
              CHECKBOX_SIZE_CLASSES[size],
              CHECKBOX_BOX_BASE,
              error ? CHECKBOX_BOX_ERROR_BORDER : CHECKBOX_BOX_DEFAULT_BORDER,
              (isChecked || indeterminate) && !error && CHECKBOX_BOX_CHECKED,
              !disabled && CHECKBOX_BOX_HOVER
            )}
            style={{
              backgroundColor: (isChecked || indeterminate) ? (error ? CHECKBOX_ERROR_COLOR : accentColor) : 'transparent',
              borderColor: (isChecked || indeterminate) && !error ? accentColor : undefined,
            }}
          >
            {(indeterminate || isChecked) && (
              <CheckboxIndicatorIcon
                size={iconSize}
                indicator={indicator}
                indeterminate={indeterminate}
              />
            )}
          </div>
        </div>
        {label && (
          <span className={cn(
            CHECKBOX_LABEL_SIZE_CLASSES[size],
            CHECKBOX_LABEL_TEXT,
            error && CHECKBOX_LABEL_ERROR
          )}>
            {label}
          </span>
        )}
      </label>
      {helperText && (
        <span className={cn(
          CHECKBOX_HELPER_BASE,
          error ? CHECKBOX_HELPER_ERROR : CHECKBOX_HELPER_DEFAULT
        )}>
          {helperText}
        </span>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
