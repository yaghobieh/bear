export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
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

