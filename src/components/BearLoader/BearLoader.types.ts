export interface BearLoaderProps {
  /** Size of the loader */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Loading text to display */
  text?: string;
  /** Whether to show the loader as fullscreen overlay */
  fullscreen?: boolean;
  /** Duration of the loading animation before completing */
  duration?: number;
  /** Callback when loading completes */
  onComplete?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

