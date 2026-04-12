export type OTPInputVariant = 'boxed' | 'outline' | 'underline' | 'circle';

export type OTPInputLayout = 'horizontal' | 'vertical';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onFinish?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  mask?: boolean;
  size?: 'sm' | 'md' | 'lg';
  separator?: number;
  className?: string;
  variant?: OTPInputVariant;
  layout?: OTPInputLayout;
  stackOnNarrow?: boolean;
  cancelAutoJump?: boolean;
}
