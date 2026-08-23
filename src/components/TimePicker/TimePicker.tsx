import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { TimePickerProps } from './TimePicker.types';
import { cn } from '@utils';
import { resolveOverlayEffects, useClickOutsideMultiple, useFixedAnchorPosition, useMediaQuery } from '@hooks';
import { ClockIcon } from '../Icon';
import { OverlayPortal } from '../OverlayPortal';
import { formatTime } from './TimePicker.utils';
import {
  sizeClasses,
  variantClasses,
  TIMEPICKER_DEFAULT_BREAKPOINT,
  TIMEPICKER_HOURS_12H,
  TIMEPICKER_HOURS_24H,
  TIMEPICKER_MINUTES_DIVISOR,
  TIMEPICKER_ROOT_CLASSES,
  TIMEPICKER_LABEL_CLASSES,
  TIMEPICKER_BUTTON_CLASSES,
  TIMEPICKER_ERROR_CLASSES,
  TIMEPICKER_HELPER_CLASSES,
  TIMEPICKER_FORMAT_12H,
  TIMEPICKER_FORMAT_24H,
  TIMEPICKER_VARIANT_AUTO,
  TIMEPICKER_VARIANT_DIAL,
  TIMEPICKER_VARIANT_COLUMNS,
  TIMEPICKER_DROPDOWN_ATTR,
  TIMEPICKER_DROPDOWN_HEIGHT_PX,
  TIMEPICKER_DROPDOWN_Z_INDEX,
  TIMEPICKER_CLOCK_ICON_CLASS,
} from './TimePicker.constants';
import { TimePickerColumnsDropdown } from './components/TimePickerColumnsDropdown';
import { TimePickerDialDropdown } from './components/TimePickerDialDropdown';

export const TimePicker: FC<TimePickerProps> = (incomingProps) => {
  const props: TimePickerProps = {
    value: incomingProps.value,
    onChange: incomingProps.onChange,
    disabled: incomingProps.disabled ?? false,
    placeholder: incomingProps.placeholder ?? 'Select time',
    label: incomingProps.label,
    error: incomingProps.error,
    helperText: incomingProps.helperText,
    format: incomingProps.format ?? TIMEPICKER_FORMAT_12H,
    minuteStep: incomingProps.minuteStep ?? 5,
    clearable: incomingProps.clearable ?? true,
    className: incomingProps.className,
    size: incomingProps.size ?? 'md',
    variant: incomingProps.variant ?? 'default',
    dropdownVariant: incomingProps.dropdownVariant ?? TIMEPICKER_VARIANT_COLUMNS,
    dropdownVariantBreakpoint: incomingProps.dropdownVariantBreakpoint ?? TIMEPICKER_DEFAULT_BREAKPOINT,
    icon: incomingProps.icon,
    translations: incomingProps.translations,
    openEffect: incomingProps.openEffect,
    closeEffect: incomingProps.closeEffect,
    effect: incomingProps.effect,
    testId: incomingProps.testId,
  };
  const { openEffect, closeEffect } = resolveOverlayEffects(incomingProps);

  const {
    value,
    onChange,
    disabled,
    placeholder,
    label,
    error,
    helperText,
    format,
    minuteStep,
    clearable,
    className,
    size,
    variant,
    dropdownVariant,
    dropdownVariantBreakpoint,
    icon,
    translations,
    testId,
  } = props;

  const isWideScreen = useMediaQuery(`(min-width: ${dropdownVariantBreakpoint}px)`);
  const rawVariant = dropdownVariant === TIMEPICKER_VARIANT_AUTO
    ? (isWideScreen ? TIMEPICKER_VARIANT_DIAL : TIMEPICKER_VARIANT_COLUMNS)
    : dropdownVariant;
  const effectiveVariant = rawVariant === TIMEPICKER_VARIANT_DIAL && format === TIMEPICKER_FORMAT_24H
    ? TIMEPICKER_VARIANT_COLUMNS
    : rawVariant;

  const timeValue = value as string | undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: buttonRef,
    open: isOpen,
    estimatedHeightPx: TIMEPICKER_DROPDOWN_HEIGHT_PX,
  });

  useEffect(() => {
    if (timeValue && typeof timeValue === 'string') {
      const [time, p] = timeValue.split(' ');
      const [h, m] = time.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
      if (p) setPeriod(p as 'AM' | 'PM');
    }
  }, [timeValue]);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutsideMultiple([containerRef, dropdownRef], close, { enabled: isOpen });

  const handleConfirm = useCallback(() => {
    onChange?.(formatTime(selectedHour, selectedMinute, period, format ?? TIMEPICKER_FORMAT_12H));
    setIsOpen(false);
  }, [onChange, selectedHour, selectedMinute, period, format]);

  const hours =
    format === TIMEPICKER_FORMAT_12H
      ? Array.from({ length: TIMEPICKER_HOURS_12H }, (_, i) => i + 1)
      : Array.from({ length: TIMEPICKER_HOURS_24H }, (_, i) => i);
  const minutes = Array.from(
    { length: TIMEPICKER_MINUTES_DIVISOR / (minuteStep ?? 5) },
    (_, i) => i * (minuteStep ?? 5)
  );

  const onClose = useCallback(() => setIsOpen(false), []);

  const resolvedFormat = format ?? TIMEPICKER_FORMAT_12H;
  const resolvedMinuteStep = minuteStep ?? 5;

  const commonProps = useMemo(
    () => ({
      selectedHour,
      setSelectedHour,
      selectedMinute,
      setSelectedMinute,
      period,
      setPeriod,
      format: resolvedFormat,
      hours,
      minutes,
      timeValue,
      clearable: clearable ?? true,
      onChange,
      onConfirm: handleConfirm,
      onClose,
      translations,
    }),
    [selectedHour, selectedMinute, period, resolvedFormat, hours, minutes, timeValue, clearable, onChange, handleConfirm, onClose, translations]
  );

  const renderDropdown = useCallback(() => {
    if (!isOpen) return null;
    return effectiveVariant === TIMEPICKER_VARIANT_DIAL ? (
      <TimePickerDialDropdown {...commonProps} minuteStep={resolvedMinuteStep} />
    ) : (
      <TimePickerColumnsDropdown {...commonProps} />
    );
  }, [isOpen, effectiveVariant, commonProps, resolvedMinuteStep]);

  return (
    <div ref={containerRef} className={cn(TIMEPICKER_ROOT_CLASSES, className)} data-testid={testId}>
      {label && <label className={TIMEPICKER_LABEL_CLASSES}>{label}</label>}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          TIMEPICKER_BUTTON_CLASSES,
          sizeClasses[size ?? 'md'],
          variantClasses[variant ?? 'default'],
          error ? 'bear-border-red-500' : 'focus:bear-border-primary-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          timeValue ? 'bear-text-gray-900 dark:bear-text-white' : 'bear-text-gray-400 dark:bear-text-zinc-500'
        )}
      >
        <span>{timeValue || placeholder}</span>
        {icon ?? <ClockIcon className={TIMEPICKER_CLOCK_ICON_CLASS} />}
      </button>
      {error && <p className={TIMEPICKER_ERROR_CLASSES}>{error}</p>}
      {helperText && !error && <p className={TIMEPICKER_HELPER_CLASSES}>{helperText}</p>}
      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={overlayStyle}
        zIndex={TIMEPICKER_DROPDOWN_Z_INDEX}
        openEffect={openEffect}
        closeEffect={closeEffect}
        panelRef={dropdownRef}
        attributes={{ [TIMEPICKER_DROPDOWN_ATTR]: '' }}
      >
        {renderDropdown()}
      </OverlayPortal>
    </div>
  );
};
