import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { DateTimePickerProps } from './DateTimePicker.types';
import { Calendar } from '../Calendar';
import { cn } from '../../utils/cn';
import { useBearStyles } from '../../hooks/useBearStyles';
import { formatDate, formatTime } from './DateTimePicker.utils';

export const DateTimePicker: FC<DateTimePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date and time',
  label,
  error,
  helperText,
  dateFormat = 'MM/DD/YYYY',
  timeFormat = '12h',
  minuteStep = 5,
  clearable = true,
  className,
  style,
  bis,
  slots,
  weekdayLabels,
  firstDayOfWeek = 0,
  size = 'md',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const [draft, setDraft] = useState<Date>(() => value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const mergedStyle = useBearStyles(bis, style);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) setDraft(new Date(value));
    else setDraft(new Date());
  }, [value, isOpen]);

  const handleDateSelect = useCallback((date: Date) => {
    setDraft((prev) => {
      const next = new Date(date);
      next.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
      return next;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    onChange?.(draft);
    setIsOpen(false);
  }, [draft, onChange]);

  const handleClear = useCallback(() => {
    onChange?.(null);
    setIsOpen(false);
  }, [onChange]);

  const handleToday = useCallback(() => {
    const now = new Date();
    setDraft(now);
    setViewDate(now);
  }, []);

  const handleViewChange = useCallback((date: Date) => setViewDate(date), []);

  const hours = timeFormat === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  const h = draft.getHours();
  const m = draft.getMinutes();
  const selectedHour = timeFormat === '12h' ? (h % 12 || 12) : h;
  const selectedMinute = minutes.includes(m) ? m : minutes[0] ?? 0;
  const period = h >= 12 ? 'PM' : 'AM';

  const setHour = (hh: number) => {
    const nh = timeFormat === '12h' ? (period === 'PM' ? (hh === 12 ? 12 : hh + 12) : (hh === 12 ? 0 : hh)) : hh;
    setDraft((prev) => { const n = new Date(prev); n.setHours(nh, prev.getMinutes(), 0, 0); return n; });
  };
  const setMinute = (mm: number) => {
    setDraft((prev) => { const n = new Date(prev); n.setMinutes(mm, 0, 0); return n; });
  };
  const setPeriod = (p: 'AM' | 'PM') => {
    setDraft((prev) => {
      const n = new Date(prev);
      const hr = n.getHours();
      if (p === 'PM' && hr < 12) n.setHours(hr + 12);
      else if (p === 'AM' && hr >= 12) n.setHours(hr - 12);
      return n;
    });
  };

  const sizeClasses = { sm: 'bear-py-1.5 bear-px-3 bear-text-sm', md: 'bear-py-2 bear-px-4', lg: 'bear-py-2.5 bear-px-5 bear-text-lg' };
  const variantClasses = {
    default: 'bear-bg-zinc-800 bear-border-zinc-600',
    filled: 'bear-bg-zinc-700 bear-border-transparent',
    outline: 'bear-bg-transparent bear-border-zinc-500',
  };

  const display = value ? `${formatDate(value, dateFormat)} ${formatTime(value, timeFormat)}` : '';

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
        <span>{display || placeholder}</span>
        <svg className="bear-w-5 bear-h-5 bear-text-zinc-400 bear-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
      {isOpen && (
        <div className="bear-absolute bear-z-50 bear-mt-2 bear-left-0 bear-right-0 bear-bg-white dark:bear-bg-gray-900 bear-rounded-xl bear-shadow-xl bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-overflow-hidden bear-w-full bear-max-w-sm">
          <Calendar
            inline
            viewDate={viewDate}
            onViewChange={handleViewChange}
            value={draft}
            onSelect={handleDateSelect}
            minDate={minDate}
            maxDate={maxDate}
            slots={slots}
            weekdayLabels={weekdayLabels}
            firstDayOfWeek={firstDayOfWeek}
            clearable={false}
            showTodayButton={false}
          />
          <div className="bear-px-4 bear-pb-3 bear-pt-2 bear-border-t bear-border-zinc-200">
            <div className="bear-flex bear-gap-2 bear-mb-3">
              <div className="bear-flex-1">
                <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Hour</div>
                <div className="bear-h-24 bear-overflow-y-auto bear-space-y-0.5 bear-scrollbar-thin">
                  {hours.map((hh) => (
                    <button
                      key={hh}
                      type="button"
                      onClick={() => setHour(hh)}
                      className={cn(
                        'bear-w-full bear-py-1 bear-rounded bear-text-sm bear-transition-colors',
                        selectedHour === hh ? 'bear-bg-bear-500 bear-text-white' : 'bear-text-zinc-700 hover:bear-bg-zinc-100'
                      )}
                    >
                      {hh.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bear-flex-1">
                <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Minute</div>
                <div className="bear-h-24 bear-overflow-y-auto bear-space-y-0.5 bear-scrollbar-thin">
                  {minutes.map((mm) => (
                    <button
                      key={mm}
                      type="button"
                      onClick={() => setMinute(mm)}
                      className={cn(
                        'bear-w-full bear-py-1 bear-rounded bear-text-sm bear-transition-colors',
                        selectedMinute === mm ? 'bear-bg-bear-500 bear-text-white' : 'bear-text-zinc-700 hover:bear-bg-zinc-100'
                      )}
                    >
                      {mm.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
              {timeFormat === '12h' && (
                <div className="bear-flex-1">
                  <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Period</div>
                  <div className="bear-space-y-0.5">
                    {(['AM', 'PM'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriod(p)}
                        className={cn(
                          'bear-w-full bear-py-2 bear-rounded bear-text-sm bear-transition-colors',
                          period === p ? 'bear-bg-bear-500 bear-text-white' : 'bear-text-zinc-700 hover:bear-bg-zinc-100'
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bear-flex bear-gap-2 bear-justify-between">
              {clearable && value ? (
                <button type="button" onClick={handleClear} className="bear-text-sm bear-text-zinc-500 hover:bear-text-zinc-700">
                  Clear
                </button>
              ) : <span />}
              <div className="bear-flex bear-gap-2">
                <button type="button" onClick={handleToday} className="bear-text-sm bear-text-bear-600 hover:bear-text-bear-700 bear-font-medium">
                  Today
                </button>
                <button type="button" onClick={handleConfirm} className="bear-text-sm bear-bg-bear-500 bear-text-white bear-px-3 bear-py-1 bear-rounded bear-font-medium hover:bear-bg-bear-600">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
