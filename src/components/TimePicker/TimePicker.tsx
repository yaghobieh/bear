import { FC, useState, useRef, useEffect } from 'react';
import { TimePickerProps } from './TimePicker.types';
import { DateTimePicker } from '../DateTimePicker';
import { cn } from '../../utils/cn';
import { formatTime } from './TimePicker.utils';
import { sizeClasses, variantClasses, TIMEPICKER_HOURS_12H, TIMEPICKER_HOURS_24H, TIMEPICKER_MINUTES_DIVISOR } from './TimePicker.constants';

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
          timeValue ? 'bear-text-white' : 'bear-text-zinc-500'
        )}
      >
        <span>{timeValue || placeholder}</span>
        <svg className="bear-w-5 bear-h-5 bear-text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
      {isOpen && (
        <div className="bear-absolute bear-z-50 bear-mt-1 bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3 bear-w-64">
          <div className="bear-flex bear-gap-2 bear-mb-3">
            <div className="bear-flex-1">
              <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Hour</div>
              <div className="bear-h-32 bear-overflow-y-auto bear-space-y-1 bear-scrollbar-thin">
                {hours.map(h => (
                  <button
                    key={h}
                    onClick={() => setSelectedHour(h)}
                    className={cn(
                      'bear-w-full bear-py-1 bear-rounded bear-text-sm bear-transition-colors',
                      selectedHour === h ? 'bear-bg-pink-500 bear-text-white' : 'bear-text-zinc-300 hover:bear-bg-zinc-700'
                    )}
                  >
                    {h.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            <div className="bear-flex-1">
              <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Minute</div>
              <div className="bear-h-32 bear-overflow-y-auto bear-space-y-1 bear-scrollbar-thin">
                {minutes.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMinute(m)}
                    className={cn(
                      'bear-w-full bear-py-1 bear-rounded bear-text-sm bear-transition-colors',
                      selectedMinute === m ? 'bear-bg-pink-500 bear-text-white' : 'bear-text-zinc-300 hover:bear-bg-zinc-700'
                    )}
                  >
                    {m.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            {format === '12h' && (
              <div className="bear-flex-1">
                <div className="bear-text-xs bear-text-zinc-500 bear-mb-1 bear-text-center">Period</div>
                <div className="bear-space-y-1">
                  {(['AM', 'PM'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={cn(
                        'bear-w-full bear-py-2 bear-rounded bear-text-sm bear-transition-colors',
                        period === p ? 'bear-bg-pink-500 bear-text-white' : 'bear-text-zinc-300 hover:bear-bg-zinc-700'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bear-flex bear-gap-2 bear-pt-2 bear-border-t bear-border-zinc-700">
            {clearable && timeValue && (
              <button onClick={() => { onChange?.(''); setIsOpen(false); }} className="bear-flex-1 bear-py-1.5 bear-text-sm bear-text-zinc-400 hover:bear-text-white bear-rounded bear-border bear-border-zinc-600">
                Clear
              </button>
            )}
            <button onClick={handleConfirm} className="bear-flex-1 bear-py-1.5 bear-text-sm bear-bg-pink-500 bear-text-white bear-rounded hover:bear-bg-pink-600">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

