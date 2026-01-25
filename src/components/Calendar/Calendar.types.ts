import type { ReactNode } from 'react';

export interface CalendarDayProps {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isHighlighted?: boolean;
}

export interface CalendarNavActions {
  onPrevYear: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
}

export interface CalendarSlots {
  /** Root calendar container */
  root?: (props: { children: ReactNode; className?: string }) => ReactNode;
  /** Header (month/year + nav) */
  header?: (props: {
    month: string;
    year: number;
    onPrev: () => void;
    onNext: () => void;
    nav?: CalendarNavActions;
  }) => ReactNode;
  /** Prev month button */
  navPrev?: (props: { onClick: () => void; disabled?: boolean }) => ReactNode;
  /** Next month button */
  navNext?: (props: { onClick: () => void; disabled?: boolean }) => ReactNode;
  /** Prev year button (e.g. «) */
  navPrevYear?: (props: { onClick: () => void; disabled?: boolean }) => ReactNode;
  /** Next year button (e.g. ») */
  navNextYear?: (props: { onClick: () => void; disabled?: boolean }) => ReactNode;
  /** Month/year label */
  headerLabel?: (props: { month: string; year: number }) => ReactNode;
  /** Weekday row (e.g. Su Mo Tu ...) */
  weekdays?: (props: { days: string[] }) => ReactNode;
  /** Weekday cell */
  weekday?: (props: { label: string }) => ReactNode;
  /** Grid of days */
  daysGrid?: (props: { children: ReactNode; className?: string }) => ReactNode;
  /** Single day cell */
  day?: (props: CalendarDayProps & { onClick: () => void }) => ReactNode;
  /** Empty cell (leading/trailing padding) */
  emptyDay?: (props: { key: string }) => ReactNode;
  /** Footer (e.g. clear, today) */
  footer?: (props: { children?: ReactNode }) => ReactNode;
  /** Clear button */
  clearButton?: (props: { onClick: () => void; hasSelection: boolean }) => ReactNode;
  /** Today button */
  todayButton?: (props: { onClick: () => void }) => ReactNode;
}

export interface CalendarProps {
  /** Currently viewed month (controls calendar view) */
  viewDate: Date;
  /** Selected date */
  value?: Date | null;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when view month changes */
  onViewChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  /** Weekday labels, default Su–Sa */
  weekdayLabels?: string[];
  /** First day of week 0=Sun, 1=Mon, etc. */
  firstDayOfWeek?: number;
  showWeekNumbers?: boolean;
  /** Slot overrides for full customization */
  slots?: CalendarSlots;
  /** Show clear button in footer */
  clearable?: boolean;
  onClear?: () => void;
  /** Show Today button in footer */
  showTodayButton?: boolean;
  onToday?: () => void;
  /** Bear Inner Style - sx-like overrides */
  bis?: import('../../types/bis.types').BisProp;
  /** Inline styles */
  style?: React.CSSProperties;
  /** When true, render as block (no absolute). Use when embedding in DateTimePicker etc. */
  inline?: boolean;
  className?: string;
}
