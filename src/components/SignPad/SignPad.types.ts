import { HTMLAttributes } from 'react';

export interface SignPadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Callback when signature changes - receives base64 image data */
  onChange?: (signature: string | null) => void;
  /** Width of the canvas */
  width?: number;
  /** Height of the canvas */
  height?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Background color */
  backgroundColor?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Show save button */
  showSave?: boolean;
  /** Clear button text */
  clearText?: string;
  /** Save button text */
  saveText?: string;
  /** Output format */
  outputFormat?: 'image/png' | 'image/jpeg' | 'image/webp';
  /** Output quality (0-1 for jpeg/webp) */
  outputQuality?: number;
  /** Test ID */
  testId?: string;
  /** Unique ID */
  id?: string;
}

