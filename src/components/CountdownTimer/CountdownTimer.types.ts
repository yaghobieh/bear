import type { ReactNode } from 'react';
import type { TypographyProps } from '../Typography/Typography.types';

export type CountdownTimerVariant = 'default' | 'card' | 'minimal' | 'flip' | 'digital';
export type CountdownTimerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CountdownTimerProps {
  /** Target date/time to count down to */
  targetDate?: Date | string | number;
  /** Duration in seconds (alternative to targetDate) */
  duration?: number;
  /** Visual variant */
  variant?: CountdownTimerVariant | (string & {});
  /** Size preset */
  size?: CountdownTimerSize;
  /** Whether to show days */
  showDays?: boolean;
  /** Whether to show hours */
  showHours?: boolean;
  /** Whether to show minutes */
  showMinutes?: boolean;
  /** Whether to show seconds */
  showSeconds?: boolean;
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to show separator */
  showSeparator?: boolean;
  /** Separator character */
  separator?: string | number;
  /** Custom labels */
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  /** Called when countdown reaches zero */
  onComplete?: () => void;
  /** Called every second */
  onTick?: (remaining: CountdownTime) => void;
  /** Whether countdown is paused */
  paused?: boolean;
  /** Custom renderer */
  render?: (time: CountdownTime) => ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
  /** Typography props for digit blocks (merged with size presets). */
  digitTypographyProps?: Partial<TypographyProps>;
  /** Typography props for unit labels. */
  labelTypographyProps?: Partial<TypographyProps>;
  /** Typography props for separators (e.g., ":" size/style). */
  separatorTypographyProps?: Partial<TypographyProps>;
  /** When true (default), use smaller digits and wrapping on narrow widths. */
  narrowLayout?: boolean;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isComplete: boolean;
}
