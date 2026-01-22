import { ReactNode } from 'react';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  format?: string;
  locale?: string;
  range?: boolean;
  rangeValue?: [Date | null, Date | null];
  clearable?: boolean;
  className?: string;
  showWeekNumbers?: boolean;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  leftIcon?: ReactNode;
}

