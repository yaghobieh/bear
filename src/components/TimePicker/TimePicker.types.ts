/** Dropdown variant: columns (scrollable lists), dial (clock face), auto (responsive). */
export type TimePickerDropdownVariant = 'columns' | 'dial' | 'auto';

/** Time format: 12-hour with AM/PM or 24-hour. */
export type TimePickerFormat = '12h' | '24h';

/** Translation keys for replaceable strings. */
export interface TimePickerTranslations {
  selectTime?: string;
  hour?: string;
  minute?: string;
  period?: string;
  cancel?: string;
  ok?: string;
}

/** Props for TimePickerColumnsDropdown sub-component. */
export interface TimePickerColumnsProps {
  selectedHour: number;
  setSelectedHour: (h: number) => void;
  selectedMinute: number;
  setSelectedMinute: (m: number) => void;
  period: 'AM' | 'PM';
  setPeriod: (p: 'AM' | 'PM') => void;
  format: TimePickerFormat;
  hours: number[];
  minutes: number[];
  timeValue?: string;
  clearable: boolean;
  onChange?: (time: string | null) => void;
  onConfirm: () => void;
  onClose: () => void;
  translations?: TimePickerTranslations;
}

/** Props for TimePickerDialDropdown sub-component. */
export interface TimePickerDialProps extends TimePickerColumnsProps {
  minuteStep: number;
}

export interface TimePickerProps {
  /** Time string (e.g. "02:30 PM") */
  value?: string | null;
  onChange?: (time: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  format?: TimePickerFormat;
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  clearable?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  /** Dropdown variant: columns (scrollable lists), dial (clock face), auto (responsive by breakpoint). */
  dropdownVariant?: TimePickerDropdownVariant;
  /** Breakpoint (px) for auto: use dial above, columns below. Default 768. */
  dropdownVariantBreakpoint?: number;
  /** Custom icon to replace the default clock icon (ReactNode). */
  icon?: React.ReactNode;
  /** Translation overrides for selectTime, hour, minute, period, cancel, ok. */
  translations?: TimePickerTranslations;
}

