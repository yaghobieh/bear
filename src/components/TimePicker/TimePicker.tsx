import { FC, useState, useRef, useEffect } from 'react';
import { TimePickerProps } from './TimePicker.types';
import { DateTimePicker } from '../DateTimePicker';
import { cn } from '@utils';
import { formatTime } from './TimePicker.utils';
import {
  sizeClasses,
  variantClasses,
  TIMEPICKER_HOURS_12H,
  TIMEPICKER_HOURS_24H,
  TIMEPICKER_MINUTES_DIVISOR,
  TIMEPICKER_ROOT_CLASSES,
  TIMEPICKER_LABEL_CLASSES,
  TIMEPICKER_BUTTON_CLASSES,
  TIMEPICKER_DROPDOWN_CLASSES,
  TIMEPICKER_COLUMN_HEADER_CLASSES,
  TIMEPICKER_COLUMN_CLASSES,
  TIMEPICKER_OPTION_CLASSES,
  TIMEPICKER_OPTION_ACTIVE_CLASSES,
  TIMEPICKER_OPTION_INACTIVE_CLASSES,
  TIMEPICKER_FOOTER_CLASSES,
  TIMEPICKER_CLEAR_BUTTON_CLASSES,
  TIMEPICKER_CONFIRM_BUTTON_CLASSES,
  TIMEPICKER_ERROR_CLASSES,
  TIMEPICKER_HELPER_CLASSES,
} from './TimePicker.constants';

export const TimePicker: FC<TimePickerProps> = ({
  mode = 'time',
  value,
  onChange,
  disabled = false,
  placeholder = 'Select time',
  label,
  error,
  helperText,
  format = '12h',
  minuteStep = 5,
  clearable = true,
  className,
  size = 'md',
  variant = 'default',
  ...rest
}) => {
  if (mode === 'datetime') {
    return (
      <DateTimePicker
        value={value instanceof Date ? value : null}
        onChange={(d) => onChange?.(d)}
        disabled={disabled}
        placeholder={placeholder}
        label={label}
        error={error}
        helperText={helperText}
        timeFormat={format}
        minuteStep={minuteStep}
        clearable={clearable}
        className={className}
        size={size}
        variant={variant}
        {...rest}
      />
    );
  }

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

  const handleConfirm = () => {
    onChange?.(formatTime(selectedHour, selectedMinute, period, format));
    setIsOpen(false);
  };

  const hours =
    format === '12h'
      ? Array.from({ length: TIMEPICKER_HOURS_12H }, (_, i) => i + 1)
      : Array.from({ length: TIMEPICKER_HOURS_24H }, (_, i) => i);
  const minutes = Array.from(
    { length: TIMEPICKER_MINUTES_DIVISOR / minuteStep },
    (_, i) => i * minuteStep
  );

  return (
    <div ref={containerRef} className={cn(TIMEPICKER_ROOT_CLASSES, className)}>
      {label && <label className={TIMEPICKER_LABEL_CLASSES}>{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          TIMEPICKER_BUTTON_CLASSES,
          sizeClasses[size],
          variantClasses[variant],
          error ? 'bear-border-red-500' : 'focus:bear-border-pink-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          timeValue ? 'bear-text-gray-900 dark:bear-text-white' : 'bear-text-gray-400 dark:bear-text-zinc-500'
        )}
      >
        <span>{timeValue || placeholder}</span>
        <svg className="bear-w-5 bear-h-5 bear-text-gray-400 dark:bear-text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {error && <p className={TIMEPICKER_ERROR_CLASSES}>{error}</p>}
      {helperText && !error && <p className={TIMEPICKER_HELPER_CLASSES}>{helperText}</p>}
      {isOpen && (
        <div className={TIMEPICKER_DROPDOWN_CLASSES}>
          <div className="bear-flex bear-gap-2 bear-mb-3">
            <div className="bear-flex-1">
              <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>Hour</div>
              <div className={TIMEPICKER_COLUMN_CLASSES}>
                {hours.map(h => (
                  <button
                    key={h}
                    onClick={() => setSelectedHour(h)}
                    className={cn(
                      TIMEPICKER_OPTION_CLASSES,
                      selectedHour === h ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                    )}
                  >
                    {h.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            <div className="bear-flex-1">
              <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>Minute</div>
              <div className={TIMEPICKER_COLUMN_CLASSES}>
                {minutes.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMinute(m)}
                    className={cn(
                      TIMEPICKER_OPTION_CLASSES,
                      selectedMinute === m ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                    )}
                  >
                    {m.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            {format === '12h' && (
              <div className="bear-flex-1">
                <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>Period</div>
                <div className="bear-space-y-1">
                  {(['AM', 'PM'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={cn(
                        TIMEPICKER_OPTION_CLASSES,
                        'bear-py-2',
                        period === p ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={TIMEPICKER_FOOTER_CLASSES}>
            {clearable && timeValue && (
              <button onClick={() => { onChange?.(''); setIsOpen(false); }} className={TIMEPICKER_CLEAR_BUTTON_CLASSES}>
                Clear
              </button>
            )}
            <button onClick={handleConfirm} className={TIMEPICKER_CONFIRM_BUTTON_CLASSES}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

