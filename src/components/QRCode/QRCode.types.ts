import type { CSSProperties } from 'react';

export interface QRCodeProps {
  /** The value to encode in the QR code */
  value: string;
  /** Size in pixels */
  size?: number;
  /** Error correction level */
  level?: 'L' | 'M' | 'Q' | 'H';
  /** Background color */
  bgColor?: string;
  /** Foreground color */
  fgColor?: string;
  /** Include margin (quiet zone) */
  includeMargin?: boolean;
  /** Center image URL */
  imageUrl?: string;
  /** Center image size (as percentage of QR code size) */
  imageSize?: number;
  /** Render as canvas or SVG */
  renderAs?: 'canvas' | 'svg';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: CSSProperties;
  /** Test ID */
  testId?: string;
}

export interface QRCodeCell {
  row: number;
  col: number;
  isDark: boolean;
}
