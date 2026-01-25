export interface TimePickerProps {
  /** Time-only (string) or date+time (Date). When 'datetime', uses Calendar + time. */
  mode?: 'time' | 'datetime';
  /** Time string (e.g. "02:30 PM") when mode='time'; Date when mode='datetime' */
  value?: string | Date | null;
  onChange?: (time: string | Date | null) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  format?: '12h' | '24h';
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  clearable?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
}

