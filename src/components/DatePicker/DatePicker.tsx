import { FC, useState, useRef, useCallback } from 'react';
import type { DatePickerProps } from './DatePicker.types';
import { Calendar } from '../Calendar';
import { OverlayPortal } from '../OverlayPortal';
import { cn } from '@utils';
import { useBearStyles, useClickOutsideMultiple, useFixedAnchorPosition } from '@hooks';
import {
  OVERLAY_OPEN_EFFECT_DEFAULT,
} from '../../hooks/useFixedAnchorPosition';
import { formatDate } from './DatePicker.utils';
import {
  D_A_T_E_P_I_C_K_E_R_ROOT_CLASS,
  DATEPICKER_CALENDAR_ATTR,
  DATEPICKER_DEFAULT_FIRST_DAY,
  DATEPICKER_DEFAULT_FORMAT,
  DATEPICKER_DEFAULT_PLACEHOLDER,
  DATEPICKER_DROPDOWN_HEIGHT_PX,
  DATEPICKER_DROPDOWN_Z_INDEX,
  DATEPICKER_SIZE_CLASSES,
  DATEPICKER_VARIANT_CLASSES,
} from './DatePicker.const';

export const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    disabled = false,
    placeholder = DATEPICKER_DEFAULT_PLACEHOLDER,
    label,
    error,
    helperText,
    format = DATEPICKER_DEFAULT_FORMAT,
    clearable = true,
    className,
    style,
    bis,
    showWeekNumbers = false,
    disabledDates = [],
    highlightedDates = [],
    slots,
    weekdayLabels,
    firstDayOfWeek = DATEPICKER_DEFAULT_FIRST_DAY,
    size = 'md',
    variant = 'default',
    icon,
    openEffect = OVERLAY_OPEN_EFFECT_DEFAULT,
    testId,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mergedStyle = useBearStyles(bis, style);
  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: buttonRef,
    open: isOpen,
    estimatedHeightPx: DATEPICKER_DROPDOWN_HEIGHT_PX,
  });

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutsideMultiple([containerRef, dropdownRef], close, { enabled: isOpen });

  const handleSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange?.(null);
    setIsOpen(false);
  }, [onChange]);

  const handleViewChange = useCallback((date: Date) => {
    setViewDate(date);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(D_A_T_E_P_I_C_K_E_R_ROOT_CLASS, 'bear-relative', className)}
      style={Object.keys(mergedStyle).length ? mergedStyle : undefined}
      data-testid={testId}
    >
      {label && (
        <label className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__label bear-block bear-text-sm bear-font-medium bear-text-zinc-700 dark:bear-text-zinc-300 bear-mb-1.5`}>
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          `${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__trigger bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-text-left bear-transition-colors`,
          DATEPICKER_SIZE_CLASSES[size],
          DATEPICKER_VARIANT_CLASSES[variant],
          error ? 'bear-border-red-500' : 'focus:bear-border-primary-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          value ? 'bear-text-zinc-900 dark:bear-text-white' : 'bear-text-zinc-500'
        )}
      >
        <span className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__value`}>
          {value ? formatDate(value, format) : placeholder}
        </span>
        <span className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__icon`}>
          {icon ?? (
            <svg className="bear-w-5 bear-h-5 bear-text-zinc-400 bear-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </span>
      </button>
      {error && <p className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__error bear-mt-1 bear-text-xs bear-text-red-400`}>{error}</p>}
      {helperText && !error && (
        <p className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__helper bear-mt-1 bear-text-xs bear-text-zinc-500`}>{helperText}</p>
      )}
      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={overlayStyle}
        zIndex={DATEPICKER_DROPDOWN_Z_INDEX}
        openEffect={openEffect}
        className={`${D_A_T_E_P_I_C_K_E_R_ROOT_CLASS}__dropdown`}
        panelRef={dropdownRef}
        attributes={{ [DATEPICKER_CALENDAR_ATTR]: '' }}
      >
        <Calendar
          viewDate={viewDate}
          onViewChange={handleViewChange}
          value={value ?? null}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          highlightedDates={highlightedDates}
          slots={slots}
          weekdayLabels={weekdayLabels}
          firstDayOfWeek={firstDayOfWeek}
          showWeekNumbers={showWeekNumbers}
          clearable={clearable}
          onClear={handleClear}
          showTodayButton
          onToday={() => {
            onChange?.(new Date());
            setIsOpen(false);
          }}
        />
      </OverlayPortal>
    </div>
  );
};
