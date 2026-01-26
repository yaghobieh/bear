import { HTMLAttributes, ReactNode } from 'react';

export interface RichEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  toolbar?: ToolbarOption[];
}

export type ToolbarOption = 
  | 'bold' 
  | 'italic' 
  | 'underline' 
  | 'strikethrough'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'code'
  | 'link'
  | 'divider';

export interface ToolbarButtonProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

