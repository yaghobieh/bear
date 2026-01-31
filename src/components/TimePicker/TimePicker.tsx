import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { TimePickerProps } from './TimePicker.types';
import { cn } from '@utils';
import { useMediaQuery } from '@hooks/useMediaQuery';
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
} from './TimePicker.constants';
import { TimePickerColumnsDropdown } from './components/TimePickerColumnsDropdown';
import { TimePickerDialDropdown } from './components/TimePickerDialDropdown';

const DEFAULT_CLOCK_ICON = (
  <svg className="bear-w-5 bear-h-5 bear-text-gray-400 dark:bear-text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

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
  };

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

  useEffect(() => {
    if (timeValue && typeof timeValue === 'string') {
      const [time, p] = timeValue.split(' ');
      const [h, m] = time.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);
      if (p) setPeriod(p as 'AM' | 'PM');
    }
  }, [timeValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div ref={containerRef} className={cn(TIMEPICKER_ROOT_CLASSES, className)}>
      {label && <label className={TIMEPICKER_LABEL_CLASSES}>{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          TIMEPICKER_BUTTON_CLASSES,
          sizeClasses[size ?? 'md'],
          variantClasses[variant ?? 'default'],
          error ? 'bear-border-red-500' : 'focus:bear-border-pink-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          timeValue ? 'bear-text-gray-900 dark:bear-text-white' : 'bear-text-gray-400 dark:bear-text-zinc-500'
        )}
      >
        <span>{timeValue || placeholder}</span>
        {icon ?? DEFAULT_CLOCK_ICON}
      </button>
      {error && <p className={TIMEPICKER_ERROR_CLASSES}>{error}</p>}
      {helperText && !error && <p className={TIMEPICKER_HELPER_CLASSES}>{helperText}</p>}
      {renderDropdown()}
    </div>
  );
};
