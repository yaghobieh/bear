import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import { resolveOverlayEffects, useClickOutsideMultiple, useFixedAnchorPosition } from '@hooks';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EMPTY_STRING,
  HOURS_MIDNIGHT,
  LABEL_CLEAR,
  LAST_MONTH_INDEX,
  NEGATIVE_ONE,
  ONE,
  PICKING_START,
  PLACEHOLDER_SELECT_DATE_RANGE,
  PRESET_SIDEBAR_MIN_WIDTH_PX,
  SIZE_MD,
  ZERO,
} from '@const';
import { CalendarIcon } from '../Icon';
import { OverlayPortal } from '../OverlayPortal';
import type { DateRangePickerProps, DateRange } from './DateRangePicker.types';
import {
  DAY_LABELS,
  MONTH_LABELS,
  SIZE_CLASSES,
  DATERANGE_DROPDOWN_ATTR,
  DATERANGE_DROPDOWN_HEIGHT_PX,
  DATERANGE_DROPDOWN_Z_INDEX,
} from './DateRangePicker.const';
import {
  isSameDay,
  isInRange,
  formatDate,
  getCalendarDays,
  getDefaultPresets,
  resolveRightMonth,
} from './DateRangePicker.utils';

const CalendarMonth: FC<{
  year: number;
  month: number;
  range: DateRange;
  onDayClick: (d: Date) => void;
  onNav: (dir: number) => void;
  minDate?: Date;
  maxDate?: Date;
}> = ({ year, month, range, onDayClick, onNav, minDate, maxDate }) => {
  const days = getCalendarDays(year, month);
  const today = new Date();
  today.setHours(HOURS_MIDNIGHT, HOURS_MIDNIGHT, HOURS_MIDNIGHT, HOURS_MIDNIGHT);

  return (
    <div className="bear-w-64">
      <div className="bear-flex bear-items-center bear-justify-between bear-mb-2">
        <button type="button" onClick={() => onNav(NEGATIVE_ONE)} className="bear-p-1 bear-rounded hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700 bear-text-gray-500 dark:bear-text-zinc-400" aria-label="Previous month">
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="bear-text-sm bear-font-semibold bear-text-gray-900 dark:bear-text-white">{MONTH_LABELS[month]} {year}</span>
        <button type="button" onClick={() => onNav(ONE)} className="bear-p-1 bear-rounded hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700 bear-text-gray-500 dark:bear-text-zinc-400" aria-label="Next month">
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="bear-grid bear-grid-cols-7 bear-gap-0.5 bear-mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="bear-text-xs bear-text-center bear-font-medium bear-text-gray-400 dark:bear-text-zinc-500 bear-py-1">{d}</div>
        ))}
      </div>
      <div className="bear-grid bear-grid-cols-7 bear-gap-0.5">
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const disabled = (minDate && day < minDate) || (maxDate && day > maxDate);
          const selected = isSameDay(day, range.start) || isSameDay(day, range.end);
          const inRange = isInRange(day, range.start, range.end);
          const isToday = isSameDay(day, today);
          return (
            <button
              key={day.getTime()}
              type="button"
              disabled={!!disabled}
              onClick={() => onDayClick(day)}
              className={cn(
                'bear-w-8 bear-h-8 bear-text-sm bear-rounded-full bear-transition-colors bear-cursor-pointer',
                disabled ? 'bear-text-gray-300 dark:bear-text-zinc-600 bear-cursor-not-allowed' : 'hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700',
                selected && 'bear-bg-primary-500 bear-text-white',
                !selected && inRange && 'bear-bg-primary-100 dark:bear-bg-primary-900/30 bear-text-primary-800 dark:bear-text-primary-200',
                !selected && !inRange && isToday && 'bear-ring-1 bear-ring-primary-400',
                !selected && !inRange && !disabled && 'bear-text-gray-700 dark:bear-text-zinc-300',
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const DateRangePicker: FC<DateRangePickerProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder = PLACEHOLDER_SELECT_DATE_RANGE,
    disabled = BOOLEAN_FALSE,
    clearable = BOOLEAN_TRUE,
    minDate,
    maxDate,
    presets,
    showPresets = BOOLEAN_TRUE,
    size = SIZE_MD,
    error,
    helperText,
    className,
    testId,
    openEffect: _openEffect,
    closeEffect: _closeEffect,
    effect: _effect,
    ...rest
  } = props;
  const { openEffect, closeEffect } = resolveOverlayEffects(props);

  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange>(value ?? { start: null, end: null });
  const [picking, setPicking] = useState<'start' | 'end'>(PICKING_START);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    estimatedHeightPx: DATERANGE_DROPDOWN_HEIGHT_PX,
  });

  const now = new Date();
  const [leftMonth, setLeftMonth] = useState(now.getMonth());
  const [leftYear, setLeftYear] = useState(now.getFullYear());

  const rightMonthView = resolveRightMonth(leftMonth);
  const rightMonth = rightMonthView.month;
  const rightYear = leftYear + rightMonthView.yearDelta;

  useEffect(() => {
    if (value) setRange(value);
  }, [value]);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutsideMultiple([containerRef, dropdownRef], close, { enabled: isOpen });

  const handleDayClick = useCallback((day: Date) => {
    if (picking === 'start') {
      setRange({ start: day, end: null });
      setPicking('end');
    } else {
      const newRange: DateRange = day >= (range.start ?? day)
        ? { start: range.start, end: day }
        : { start: day, end: range.start };
      setRange(newRange);
      setPicking('start');
      onChange?.(newRange);
    }
  }, [picking, range.start, onChange]);

  const handlePreset = useCallback((r: DateRange) => {
    setRange(r);
    onChange?.(r);
    setIsOpen(false);
    setPicking('start');
  }, [onChange]);

  const handleClear = useCallback(() => {
    const empty: DateRange = { start: null, end: null };
    setRange(empty);
    onChange?.(empty);
    setPicking('start');
  }, [onChange]);

  const navLeft = useCallback((dir: number) => {
    let m = leftMonth + dir;
    let y = leftYear;
    if (m < ZERO) { m = LAST_MONTH_INDEX; y -= ONE; }
    if (m > LAST_MONTH_INDEX) { m = ZERO; y += ONE; }
    setLeftMonth(m);
    setLeftYear(y);
  }, [leftMonth, leftYear]);

  const activePresets = presets ?? (showPresets ? getDefaultPresets() : []);
  const displayText = range.start
    ? `${formatDate(range.start)}${range.end ? ` – ${formatDate(range.end)}` : ''}`
    : placeholder;

  return (
    <div ref={containerRef} className={cn('Bear-DateRangePicker bear-relative bear-inline-block', className)} data-testid={testId} {...rest}>
      {label && <label className="Bear-DateRangePicker__label bear-block bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-zinc-300 bear-mb-1.5">{label}</label>}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white bear-transition-colors focus:bear-ring-2 focus:bear-ring-primary-500 bear-outline-none',
          SIZE_CLASSES[size],
          disabled && 'bear-opacity-50 bear-cursor-not-allowed'
        )}
      >
        <span className={cn(!range.start && 'bear-text-gray-400 dark:bear-text-zinc-500')}>{displayText}</span>
        <CalendarIcon className="bear-w-4 bear-h-4 bear-ml-2 bear-text-gray-400" />
      </button>

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={overlayStyle}
        zIndex={DATERANGE_DROPDOWN_Z_INDEX}
        openEffect={openEffect}
        closeEffect={closeEffect}
        panelRef={dropdownRef}
        className="bear-max-w-[calc(100vw-16px)] bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-xl bear-shadow-xl bear-p-4 bear-overflow-x-auto"
        attributes={{ [DATERANGE_DROPDOWN_ATTR]: EMPTY_STRING }}
      >
        <div className="bear-flex bear-gap-4">
          {activePresets.length > ZERO && (
            <div
              className="bear-border-r bear-border-gray-200 dark:bear-border-zinc-700 bear-pr-3 bear-space-y-1"
              style={{ minWidth: PRESET_SIDEBAR_MIN_WIDTH_PX }}
            >
              {activePresets.map((p) => (
                <button key={p.label} type="button" onClick={() => handlePreset(p.range())} className="bear-w-full bear-text-left bear-px-3 bear-py-1.5 bear-text-sm bear-rounded bear-transition-colors hover:bear-bg-primary-50 dark:hover:bear-bg-primary-900/20 bear-text-gray-700 dark:bear-text-zinc-300">{p.label}</button>
              ))}
              {clearable && range.start && (
                <button type="button" onClick={handleClear} className="bear-w-full bear-text-left bear-px-3 bear-py-1.5 bear-text-sm bear-rounded bear-transition-colors hover:bear-bg-primary-50 dark:hover:bear-bg-primary-900/20 bear-text-red-500">{LABEL_CLEAR}</button>
              )}
            </div>
          )}
          <CalendarMonth year={leftYear} month={leftMonth} range={range} onDayClick={handleDayClick} onNav={navLeft} minDate={minDate} maxDate={maxDate} />
          <CalendarMonth year={rightYear} month={rightMonth} range={range} onDayClick={handleDayClick} onNav={() => {}} minDate={minDate} maxDate={maxDate} />
        </div>
      </OverlayPortal>

      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-500">{error}</p>}
      {!error && helperText && <p className="bear-mt-1 bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500">{helperText}</p>}
    </div>
  );
};

export default DateRangePicker;
