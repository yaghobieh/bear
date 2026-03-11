import type { HTMLAttributes } from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  label: string;
  range: () => DateRange;
}

export interface DateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  presets?: DateRangePreset[];
  showPresets?: boolean;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  helperText?: string;
  testId?: string;
}
