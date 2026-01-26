/**
 * Calendar Component Utilities
 */
import { NUMBER } from './Calendar.const';

/**
 * Get number of days in a given month
 */
export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + NUMBER.ONE, NUMBER.ZERO).getDate();

/**
 * Get the day of week for the first day of a month (0 = Sunday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, NUMBER.ONE).getDay();

/**
 * Check if two dates are the same day
 */
export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

/**
 * Check if a day is a weekend (Saturday or Sunday)
 */
export const isWeekendDay = (weekday: number): boolean =>
  weekday === NUMBER.ZERO || weekday === NUMBER.SIX;

/**
 * Get previous month and year
 */
export const getPrevMonthYear = (
  year: number,
  month: number
): { prevMonth: number; prevYear: number } => ({
  prevMonth: month === NUMBER.ZERO ? NUMBER.ELEVEN : month - NUMBER.ONE,
  prevYear: month === NUMBER.ZERO ? year - NUMBER.ONE : year,
});

/**
 * Get next month and year
 */
export const getNextMonthYear = (
  year: number,
  month: number
): { nextMonth: number; nextYear: number } => ({
  nextMonth: month === NUMBER.ELEVEN ? NUMBER.ZERO : month + NUMBER.ONE,
  nextYear: month === NUMBER.ELEVEN ? year + NUMBER.ONE : year,
});

/**
 * Reorder weekday labels based on first day of week
 */
export const reorderWeekdays = <T>(labels: readonly T[], firstDayOfWeek: number): T[] =>
  firstDayOfWeek > NUMBER.ZERO
    ? [...labels.slice(firstDayOfWeek), ...labels.slice(NUMBER.ZERO, firstDayOfWeek)]
    : [...labels];

/**
 * Build 6-week calendar grid: prev month trailing, current month, next month leading
 */
export function buildCalendarGrid(
  year: number,
  month: number,
  firstDayOfWeek: number
): { date: Date; isCurrentMonth: boolean }[] {
  const first = getFirstDayOfMonth(year, month);
  const startOffset = (first - firstDayOfWeek + NUMBER.SEVEN) % NUMBER.SEVEN;
  const daysInMonth = getDaysInMonth(year, month);

  const { prevMonth, prevYear } = getPrevMonthYear(year, month);
  const daysInPrev = getDaysInMonth(prevYear, prevMonth);

  const cells: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = NUMBER.ZERO; i < NUMBER.TOTAL_CELLS; i++) {
    if (i < startOffset) {
      // Previous month days
      const d = daysInPrev - startOffset + i + NUMBER.ONE;
      cells.push({ date: new Date(prevYear, prevMonth, d), isCurrentMonth: false });
    } else if (i < startOffset + daysInMonth) {
      // Current month days
      const d = i - startOffset + NUMBER.ONE;
      cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
    } else {
      // Next month days
      const d = i - startOffset - daysInMonth + NUMBER.ONE;
      const { nextMonth, nextYear } = getNextMonthYear(year, month);
      cells.push({ date: new Date(nextYear, nextMonth, d), isCurrentMonth: false });
    }
  }

  return cells;
}

