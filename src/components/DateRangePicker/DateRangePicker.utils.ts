import { DAYS_IN_WEEK, CALENDAR_ROWS } from './DateRangePicker.const';

export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const isInRange = (day: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  const t = day.getTime();
  return t > start.getTime() && t < end.getTime();
};

export const formatDate = (d: Date | null): string => {
  if (!d) return '';
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
};

export const getCalendarDays = (year: number, month: number): (Date | null)[] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = CALENDAR_ROWS * DAYS_IN_WEEK;
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  while (days.length < totalCells) days.push(null);

  return days;
};
