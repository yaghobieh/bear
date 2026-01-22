import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { DatePickerProps } from './DatePicker.types';
import { cn } from '../../utils/cn';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDate = (date: Date | null, format: string = 'MM/DD/YYYY'): string => {
  if (!date) return '';
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString();
  return format.replace('DD', d).replace('MM', m).replace('YYYY', y);
};

const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
};

const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number): number => new Date(year, month, 1).getDay();

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
  size = 'md',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = useCallback((day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange?.(newDate);
    setIsOpen(false);
  }, [viewDate, onChange]);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div className="bear-absolute bear-z-50 bear-mt-1 bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3 bear-w-72">
        <div className="bear-flex bear-items-center bear-justify-between bear-mb-3">
          <button onClick={handlePrevMonth} className="bear-p-1 bear-rounded hover:bear-bg-zinc-700 bear-text-zinc-400">
            <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="bear-font-medium bear-text-white">{MONTHS[month]} {year}</span>
          <button onClick={handleNextMonth} className="bear-p-1 bear-rounded hover:bear-bg-zinc-700 bear-text-zinc-400">
            <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="bear-grid bear-grid-cols-7 bear-gap-1 bear-mb-2">
          {DAYS.map(d => <div key={d} className="bear-text-center bear-text-xs bear-text-zinc-500 bear-font-medium">{d}</div>)}
        </div>
        <div className="bear-grid bear-grid-cols-7 bear-gap-1">
          {days.map((day, i) => day === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDateDisabled(day)}
              className={cn(
                'bear-w-8 bear-h-8 bear-rounded bear-text-sm bear-transition-colors',
                isSameDay(value ?? null, new Date(year, month, day))
                  ? 'bear-bg-pink-500 bear-text-white'
                  : 'bear-text-zinc-300 hover:bear-bg-zinc-700',
                isDateDisabled(day) && 'bear-opacity-30 bear-cursor-not-allowed'
              )}
            >
              {day}
            </button>
          ))}
        </div>
        {clearable && value && (
          <button
            onClick={() => { onChange?.(null); setIsOpen(false); }}
            className="bear-w-full bear-mt-3 bear-py-1.5 bear-text-sm bear-text-zinc-400 hover:bear-text-white bear-border-t bear-border-zinc-700"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  const sizeClasses = { sm: 'bear-py-1.5 bear-px-3 bear-text-sm', md: 'bear-py-2 bear-px-4', lg: 'bear-py-2.5 bear-px-5 bear-text-lg' };
  const variantClasses = {
    default: 'bear-bg-zinc-800 bear-border-zinc-600',
    filled: 'bear-bg-zinc-700 bear-border-transparent',
    outline: 'bear-bg-transparent bear-border-zinc-500',
  };

  return (
    <div ref={containerRef} className={cn('bear-relative', className)}>
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
        <svg className="bear-w-5 bear-h-5 bear-text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
      {isOpen && renderCalendar()}
    </div>
  );
};

