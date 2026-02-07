export interface EmojiPickerProps {
  onSelect?: (emoji: string) => void;
  size?: 'sm' | 'md' | 'lg';
  maxHeight?: string | number;
  className?: string;
}
