import { FC, useState, useRef, useCallback } from 'react';
import type { SelectProps } from './Select.types';
import {
  S_E_L_E_C_T_ROOT_CLASS,
  SELECT_SIZE_CLASSES,
  SELECT_MENU_OFFSET_PX,
  SELECT_MENU_Z_INDEX,
  SELECT_DEFAULT_PLACEHOLDER,
} from './Select.const';
import { ChevronDownIcon, CheckIcon } from '../Icon';
import { OverlayPortal } from '../OverlayPortal';
import { cn, resolveBearId, useBearId } from '@utils';
import { useClickOutsideMultiple, useFixedAnchorPosition, useFormControl } from '@hooks';
import { OVERLAY_OPEN_EFFECT_DEFAULT } from '../../hooks/useFixedAnchorPosition';

export const Select: FC<SelectProps> = (props) => {
  const {
    options,
    value,
    onChange,
    placeholder = SELECT_DEFAULT_PLACEHOLDER,
    label,
    error,
    disabled = false,
    required = false,
    size = 'md',
    fullWidth = false,
    displayEmpty = false,
    renderValue,
    native = false,
    className,
    id,
    testId,
    openEffect = OVERLAY_OPEN_EFFECT_DEFAULT,
  } = props;

  const generatedId = useBearId('Select');
  const domId = resolveBearId(id, generatedId);
  const formControl = useFormControl();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: selectRef,
    open: isOpen && !native,
    offsetPx: SELECT_MENU_OFFSET_PX,
    matchWidth: true,
  });
  const isDisabled = disabled || Boolean(formControl?.disabled);
  const isRequired = required || Boolean(formControl?.required);
  const hasError = Boolean(error) || Boolean(formControl?.error);
  const errorMessage = typeof error === 'string' ? error : undefined;
  const selectedOption = options.find((opt) => opt.value === value);
  const isEmptyValue = value === undefined || value === '';
  const showPlaceholder = isEmptyValue || (displayEmpty && isEmptyValue);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  useClickOutsideMultiple([selectRef, menuRef], closeDropdown, {
    enabled: isOpen && !native && !isDisabled,
  });

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const displayContent = (() => {
    if (renderValue && !isEmptyValue) {
      return renderValue(value as string);
    }
    if (showPlaceholder || !selectedOption) {
      return placeholder;
    }
    return selectedOption.label;
  })();

  const fieldStyle = {
    backgroundColor: 'var(--bear-bg-primary)',
    borderColor: hasError ? undefined : 'var(--bear-border-default)',
    color: selectedOption && !showPlaceholder ? 'var(--bear-text-primary)' : 'var(--bear-text-muted)',
  };

  if (native) {
    return (
      <div
        id={domId}
        data-testid={testId}
        className={cn(
          S_E_L_E_C_T_ROOT_CLASS,
          'bear-relative bear-flex bear-flex-col bear-gap-1.5',
          fullWidth && 'bear-w-full'
        )}
      >
        {label && (
          <label
            htmlFor={`${domId}-native`}
            className="bear-text-sm bear-font-medium"
            style={{ color: 'var(--bear-text-secondary)' }}
          >
            {label}
          </label>
        )}
        <select
          id={`${domId}-native`}
          disabled={isDisabled}
          required={isRequired}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            `${S_E_L_E_C_T_ROOT_CLASS}__native`,
            'bear-w-full bear-rounded-lg bear-border bear-outline-none bear-transition-all bear-duration-200',
            'focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-[var(--bear-bg-primary)]',
            hasError
              ? 'bear-border-red-500 focus:bear-ring-red-500'
              : 'focus:bear-border-bear-500 focus:bear-ring-bear-500',
            isDisabled && 'bear-opacity-50 bear-cursor-not-allowed',
            SELECT_SIZE_CLASSES[size],
            className
          )}
          style={fieldStyle}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={formControl?.helperId}
        >
          {(displayEmpty || placeholder) && (
            <option value="" disabled={!displayEmpty}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="bear-text-sm bear-text-red-500">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div
      ref={selectRef}
      id={domId}
      data-testid={testId}
      className={cn(
        S_E_L_E_C_T_ROOT_CLASS,
        'bear-relative bear-flex bear-flex-col bear-gap-1.5',
        fullWidth && 'bear-w-full'
      )}
    >
      {label && (
        <label className="bear-text-sm bear-font-medium" style={{ color: 'var(--bear-text-secondary)' }}>
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={isDisabled}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={cn(
          `${S_E_L_E_C_T_ROOT_CLASS}__trigger`,
          'bear-flex bear-items-center bear-justify-between bear-w-full',
          'bear-rounded-lg bear-border bear-text-left bear-outline-none bear-transition-all bear-duration-200',
          'focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-offset-[var(--bear-bg-primary)]',
          hasError
            ? 'bear-border-red-500 focus:bear-ring-red-500'
            : 'focus:bear-border-bear-500 focus:bear-ring-bear-500 dark:focus:bear-border-bear-500 dark:focus:bear-ring-bear-500',
          isDisabled && 'bear-opacity-50 bear-cursor-not-allowed',
          SELECT_SIZE_CLASSES[size],
          className
        )}
        style={fieldStyle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={hasError || undefined}
        aria-required={isRequired || undefined}
        aria-describedby={formControl?.helperId}
      >
        <span className={`${S_E_L_E_C_T_ROOT_CLASS}__value`}>{displayContent}</span>
        <ChevronDownIcon
          className={cn(
            'bear-w-4 bear-h-4 bear-shrink-0 bear-transition-transform',
            isOpen && 'bear-rotate-180'
          )}
          style={{ color: 'var(--bear-text-muted)' }}
        />
      </button>

      <OverlayPortal
        open={isOpen && !native}
        ready={ready}
        style={{
          ...overlayStyle,
          backgroundColor: 'var(--bear-bg-primary)',
          borderColor: 'var(--bear-border-default)',
        }}
        zIndex={SELECT_MENU_Z_INDEX}
        openEffect={openEffect}
        panelRef={menuRef}
        className={`${S_E_L_E_C_T_ROOT_CLASS}__menu bear-rounded-lg bear-border bear-shadow-lg bear-overflow-hidden`}
        attributes={{ role: 'listbox' }}
      >
        <div className="bear-max-h-60 bear-overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
              className={cn(
                `${S_E_L_E_C_T_ROOT_CLASS}__option`,
                'bear-flex bear-items-center bear-justify-between bear-w-full bear-px-4 bear-py-2',
                'bear-text-left bear-transition-colors',
                option.disabled && 'bear-cursor-not-allowed',
                option.value === value &&
                  'bear-bg-bear-100 bear-text-bear-700 dark:bear-bg-bear-600/20 dark:bear-text-bear-300',
                !option.disabled &&
                  option.value !== value &&
                  'hover:bear-bg-[var(--bear-bg-tertiary)]'
              )}
              style={
                option.disabled
                  ? { color: 'var(--bear-text-muted)' }
                  : option.value === value
                    ? undefined
                    : { color: 'var(--bear-text-secondary)' }
              }
            >
              {option.label}
              {option.value === value && (
                <CheckIcon className="bear-w-4 bear-h-4 bear-shrink-0 bear-text-bear-600 dark:bear-text-bear-400" />
              )}
            </button>
          ))}
        </div>
      </OverlayPortal>

      {errorMessage && <p className="bear-text-sm bear-text-red-500">{errorMessage}</p>}
    </div>
  );
};
