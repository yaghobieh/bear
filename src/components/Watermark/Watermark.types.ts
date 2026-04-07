import type { ReactNode } from 'react';

export interface WatermarkProps {
  /** Content to display watermark over */
  children?: ReactNode;
  /** Watermark text (string or array for multi-line) */
  text?: string | string[];
  /** Watermark image URL (alternative to text) */
  image?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Font color */
  color?: string;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Opacity (0-1) */
  opacity?: number;
  /** How many staggered copies of the mark to paint inside each pattern tile (1–4 per axis). Higher = denser field. */
  patternRepeat?: number;
  /** Gap between watermarks [horizontal, vertical] */
  gap?: [number, number];
  /** Offset from top-left [x, y] */
  offset?: [number, number];
  /** Z-index of watermark layer */
  zIndex?: number;
  /** Font family */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: number | string;
  /** Whether watermark is visible */
  visible?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
