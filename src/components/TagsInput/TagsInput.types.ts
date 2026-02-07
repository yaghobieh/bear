export interface TagsInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string, index: number) => void;
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
  minLength?: number;
  maxLength?: number;
  separators?: string[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}
