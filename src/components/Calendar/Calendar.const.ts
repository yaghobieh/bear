/**
 * Calendar Component Constants
 */

// Magic numbers
export const NUMBER = {
  ZERO: 0,
  ONE: 1,
  SIX: 6,
  SEVEN: 7,
  ELEVEN: 11,
  TOTAL_CELLS: 42,
} as const;

// Default weekday labels
export const DEFAULT_WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

// Month labels
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

// Weekend days
export const WEEKEND = {
  SUNDAY: 0,
  SATURDAY: 6,
} as const;

// Weekday labels for weekend detection (case variations)
export const WEEKEND_LABELS = ['SUN', 'SAT', 'Sun', 'Sat'] as const;

