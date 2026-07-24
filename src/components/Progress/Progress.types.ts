export interface ProgressProps {
  id?: string;
  value: number;
  max?: number;
  bufferValue?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  showLabel?: boolean;
  label?: string;
  labelPosition?: 'inside' | 'outside';
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  className?: string;
  testId?: string;
}
