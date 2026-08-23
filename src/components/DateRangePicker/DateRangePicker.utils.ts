import {
  CALENDAR_ROWS,
  DATE_PAD_CHAR,
  DATE_PAD_LENGTH,
  DATE_PART_SEPARATOR,
  DAYS_IN_WEEK,
  EMPTY_STRING,
  HOURS_MIDNIGHT,
  LAST_MONTH_INDEX,
  LAST_SEVEN_DAYS_OFFSET,
  LAST_THIRTY_DAYS_OFFSET,
  ONE,
  PRESET_LABEL_LAST_MONTH,
  PRESET_LABEL_LAST_SEVEN,
  PRESET_LABEL_LAST_THIRTY,
  PRESET_LABEL_THIS_MONTH,
  PRESET_LABEL_TODAY,
  ZERO,
} from '@const';
import type { DateRangePreset } from './DateRangePicker.types';

export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) {
    return false;
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const isInRange = (day: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) {
    return false;
  }
  const t = day.getTime();
  return t > start.getTime() && t < end.getTime();
};

export const formatDate = (d: Date | null): string => {
  if (!d) {
    return EMPTY_STRING;
  }
  const mm = (d.getMonth() + ONE).toString().padStart(DATE_PAD_LENGTH, DATE_PAD_CHAR);
  const dd = d.getDate().toString().padStart(DATE_PAD_LENGTH, DATE_PAD_CHAR);
  return `${mm}${DATE_PART_SEPARATOR}${dd}${DATE_PART_SEPARATOR}${d.getFullYear()}`;
};

export const getCalendarDays = (year: number, month: number): (Date | null)[] => {
  const firstDay = new Date(year, month, ONE).getDay();
  const daysInMonth = new Date(year, month + ONE, ZERO).getDate();
  const totalCells = CALENDAR_ROWS * DAYS_IN_WEEK;
  const days: (Date | null)[] = [];

  for (let i = ZERO; i < firstDay; i += ONE) {
    days.push(null);
  }
  for (let d = ONE; d <= daysInMonth; d += ONE) {
    days.push(new Date(year, month, d));
  }
  while (days.length < totalCells) {
    days.push(null);
  }

  return days;
};

const startOfToday = (): Date => {
  const today = new Date();
  today.setHours(HOURS_MIDNIGHT, HOURS_MIDNIGHT, HOURS_MIDNIGHT, HOURS_MIDNIGHT);
  return today;
};

export const getDefaultPresets = (): DateRangePreset[] => {
  const today = startOfToday();
  return [
    {
      label: PRESET_LABEL_TODAY,
      range: () => ({ start: new Date(today), end: new Date(today) }),
    },
    {
      label: PRESET_LABEL_LAST_SEVEN,
      range: () => {
        const start = new Date(today);
        start.setDate(start.getDate() - LAST_SEVEN_DAYS_OFFSET);
        return { start, end: new Date(today) };
      },
    },
    {
      label: PRESET_LABEL_LAST_THIRTY,
      range: () => {
        const start = new Date(today);
        start.setDate(start.getDate() - LAST_THIRTY_DAYS_OFFSET);
        return { start, end: new Date(today) };
      },
    },
    {
      label: PRESET_LABEL_THIS_MONTH,
      range: () => ({ start: new Date(today.getFullYear(), today.getMonth(), ONE), end: new Date(today) }),
    },
    {
      label: PRESET_LABEL_LAST_MONTH,
      range: () => {
        const start = new Date(today.getFullYear(), today.getMonth() - ONE, ONE);
        const end = new Date(today.getFullYear(), today.getMonth(), ZERO);
        return { start, end };
      },
    },
  ];
};

export const resolveRightMonth = (leftMonth: number): { month: number; yearDelta: number } => {
  if (leftMonth === LAST_MONTH_INDEX) {
    return { month: ZERO, yearDelta: ONE };
  }
  return { month: leftMonth + ONE, yearDelta: ZERO };
};
