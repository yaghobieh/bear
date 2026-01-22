export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  mask?: boolean;
  size?: 'sm' | 'md' | 'lg';
  separator?: number;
  className?: string;
}

