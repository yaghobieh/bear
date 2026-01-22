export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

