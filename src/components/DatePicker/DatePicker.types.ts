import type { ReactNode } from 'react';
import type { CalendarSlots } from '../Calendar/Calendar.types';
import type { BisProp } from '../../types/bis.types';

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
  style?: React.CSSProperties;
  /** Bear Inner Style - sx-like overrides */
  bis?: BisProp;
  showWeekNumbers?: boolean;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  /** Customize calendar via slots (header, day, nav, etc.) */
  slots?: CalendarSlots;
  weekdayLabels?: string[];
  firstDayOfWeek?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  leftIcon?: ReactNode;
}
