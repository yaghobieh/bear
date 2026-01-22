export interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  showButtons?: boolean;
  buttonPosition?: 'sides' | 'right';
  className?: string;
  precision?: number;
}

