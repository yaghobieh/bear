import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { DateRangePickerProps, DateRange } from './DateRangePicker.types';
import {
  DAY_LABELS, MONTH_LABELS, SIZE_CLASSES,
  ROOT_CLASSES, TRIGGER_CLASSES,
  CALENDAR_HEADER_CLASSES, NAV_BTN_CLASSES,
  DAY_BASE_CLASSES, DAY_SELECTED_CLASSES, DAY_IN_RANGE_CLASSES,
  DAY_HOVER_CLASSES, DAY_DISABLED_CLASSES, DAY_TODAY_CLASSES,
  PRESET_BTN_CLASSES, LABEL_CLASSES, ERROR_CLASSES, HELPER_CLASSES,
  getDefaultPresets,
} from './DateRangePicker.const';
import { isSameDay, isInRange, formatDate, getCalendarDays } from './DateRangePicker.utils';

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
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bear-w-64">
      <div className={CALENDAR_HEADER_CLASSES}>
        <button type="button" onClick={() => onNav(-1)} className={NAV_BTN_CLASSES} aria-label="Previous month">
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="bear-text-sm bear-font-semibold bear-text-gray-900 dark:bear-text-white">{MONTH_LABELS[month]} {year}</span>
        <button type="button" onClick={() => onNav(1)} className={NAV_BTN_CLASSES} aria-label="Next month">
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
                DAY_BASE_CLASSES,
                disabled ? DAY_DISABLED_CLASSES : DAY_HOVER_CLASSES,
                selected && DAY_SELECTED_CLASSES,
                !selected && inRange && DAY_IN_RANGE_CLASSES,
                !selected && !inRange && isToday && DAY_TODAY_CLASSES,
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
    placeholder = 'Select date range',
    disabled = false,
    clearable = true,
    minDate,
    maxDate,
    presets,
    showPresets = true,
    size = 'md',
    error,
    helperText,
    className,
    testId,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [range, setRange] = useState<DateRange>(value ?? { start: null, end: null });
  const [picking, setPicking] = useState<'start' | 'end'>('start');
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const [leftMonth, setLeftMonth] = useState(now.getMonth());
  const [leftYear, setLeftYear] = useState(now.getFullYear());

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  useEffect(() => {
    if (value) setRange(value);
  }, [value]);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const padding = 8;
    const dropdownHeight = 420;
    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const showAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;
      let top = showAbove ? rect.top - dropdownHeight - padding : rect.bottom + padding;
      top = Math.max(8, Math.min(top, viewportHeight - dropdownHeight - 8));
      const estW = Math.min(640, window.innerWidth - 16);
      let left = Math.max(8, Math.min(rect.left, window.innerWidth - estW - 8));
      setDropdownPosition({ top, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setLeftMonth(m);
    setLeftYear(y);
  }, [leftMonth, leftYear]);

  const activePresets = presets ?? (showPresets ? getDefaultPresets() : []);
  const displayText = range.start
    ? `${formatDate(range.start)}${range.end ? ` – ${formatDate(range.end)}` : ''}`
    : placeholder;

  return (
    <div ref={containerRef} className={cn(ROOT_CLASSES, className)} data-testid={testId} {...rest}>
      {label && <label className={LABEL_CLASSES}>{label}</label>}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(TRIGGER_CLASSES, SIZE_CLASSES[size], disabled && 'bear-opacity-50 bear-cursor-not-allowed')}
      >
        <span className={cn(!range.start && 'bear-text-gray-400 dark:bear-text-zinc-500')}>{displayText}</span>
        <svg className="bear-w-4 bear-h-4 bear-ml-2 bear-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            data-bear-daterangepicker-dropdown
            className={cn(
              'bear-fixed bear-z-[10000] bear-max-w-[calc(100vw-16px)] bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-xl bear-shadow-xl bear-p-4 bear-overflow-x-auto'
            )}
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <div className="bear-flex bear-gap-4">
              {activePresets.length > 0 && (
                <div className="bear-border-r bear-border-gray-200 dark:bear-border-zinc-700 bear-pr-3 bear-space-y-1 bear-min-w-[120px]">
                  {activePresets.map((p) => (
                    <button key={p.label} type="button" onClick={() => handlePreset(p.range())} className={PRESET_BTN_CLASSES}>{p.label}</button>
                  ))}
                  {clearable && range.start && (
                    <button type="button" onClick={handleClear} className={cn(PRESET_BTN_CLASSES, 'bear-text-red-500')}>Clear</button>
                  )}
                </div>
              )}
              <CalendarMonth year={leftYear} month={leftMonth} range={range} onDayClick={handleDayClick} onNav={navLeft} minDate={minDate} maxDate={maxDate} />
              <CalendarMonth year={rightYear} month={rightMonth} range={range} onDayClick={handleDayClick} onNav={() => {}} minDate={minDate} maxDate={maxDate} />
            </div>
          </div>,
          document.body
        )}

      {error && <p className={ERROR_CLASSES}>{error}</p>}
      {!error && helperText && <p className={HELPER_CLASSES}>{helperText}</p>}
    </div>
  );
};

export default DateRangePicker;
