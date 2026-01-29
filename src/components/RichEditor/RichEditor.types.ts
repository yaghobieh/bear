import { HTMLAttributes, ReactNode } from 'react';

export interface RichEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled HTML content */
  value?: string;
  /** Initial HTML content (uncontrolled) */
  defaultValue?: string;
  /** Called when content changes */
  onChange?: (value: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Completely disables the editor */
  disabled?: boolean;
  /** Allows viewing but not editing */
  readOnly?: boolean;
  /** Minimum editor height in pixels */
  minHeight?: string | number;
  /** Maximum height (enables scroll) */
  maxHeight?: string | number;
  /** Toolbar buttons to display */
  toolbar?: ToolbarOption[];
  /** Test ID for testing purposes */
  testId?: string;
  /** Unique ID for accessibility */
  id?: string;
  /** Enable image paste support */
  allowImagePaste?: boolean;
}

export type ToolbarOption = 
  // Text formatting
  | 'bold' 
  | 'italic' 
  | 'underline' 
  | 'strikethrough'
  // Headings
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'headingDropdown'
  // Lists
  | 'bulletList'
  | 'orderedList'
  // Blocks
  | 'blockquote'
  | 'code'
  // Links & Media
  | 'link'
  | 'image'
  // Colors
  | 'textColor'
  | 'highlightColor'
  // Alignment
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  // Indent
  | 'indent'
  | 'outdent'
  // Misc
  | 'clearFormat'
  | 'table'
  | 'divider'
  // More options menu
  | 'more';

export interface ToolbarButtonProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
  preview?: ReactNode;
}

export interface ToolbarDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  title: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface ToolbarColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  title: string;
  disabled?: boolean;
  type?: 'text' | 'highlight';
  recentColors?: string[];
  onApplyLast?: (color: string) => void;
}
