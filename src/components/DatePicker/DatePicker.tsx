import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { DatePickerProps } from './DatePicker.types';
import { Calendar } from '../Calendar';
import { cn } from '@utils';
import { useBearStyles } from '@hooks';
import { formatDate } from './DatePicker.utils';

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date',
  label,
  error,
  helperText,
  format = 'MM/DD/YYYY',
  clearable = true,
  className,
  style,
  bis,
  showWeekNumbers = false,
  disabledDates = [],
  highlightedDates = [],
  slots,
  weekdayLabels,
  firstDayOfWeek = 0,
  size = 'md',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const mergedStyle = useBearStyles(bis, style);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const sizeClasses = { sm: 'bear-py-1.5 bear-px-3 bear-text-sm', md: 'bear-py-2 bear-px-4', lg: 'bear-py-2.5 bear-px-5 bear-text-lg' };
  const variantClasses = {
    default: 'bear-bg-zinc-800 bear-border-zinc-600',
    filled: 'bear-bg-zinc-700 bear-border-transparent',
    outline: 'bear-bg-transparent bear-border-zinc-500',
  };

  return (
    <div ref={containerRef} className={cn('bear-relative', className)} style={Object.keys(mergedStyle).length ? mergedStyle : undefined}>
      {label && <label className="bear-block bear-text-sm bear-font-medium bear-text-zinc-300 bear-mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-justify-between bear-rounded-lg bear-border bear-text-left bear-transition-colors',
          sizeClasses[size],
          variantClasses[variant],
          error ? 'bear-border-red-500' : 'focus:bear-border-pink-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          value ? 'bear-text-white' : 'bear-text-zinc-500'
        )}
      >
        <span>{value ? formatDate(value, format) : placeholder}</span>
        <svg className="bear-w-5 bear-h-5 bear-text-zinc-400 bear-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
      {isOpen && (
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
          onToday={() => { onChange?.(new Date()); setIsOpen(false); }}
        />
      )}
    </div>
  );
};
