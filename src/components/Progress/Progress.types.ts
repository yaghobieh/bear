export interface ProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside';
  /** Striped animation */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
  /** Indeterminate loading state */
  indeterminate?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

