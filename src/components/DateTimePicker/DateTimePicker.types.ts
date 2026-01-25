import type { CalendarSlots } from '../Calendar/Calendar.types';
import type { BisProp } from '../../types/bis.types';

export interface DateTimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  minuteStep?: number;
  clearable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  bis?: BisProp;
  /** Calendar slot overrides */
  slots?: CalendarSlots;
  weekdayLabels?: string[];
  firstDayOfWeek?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
}
