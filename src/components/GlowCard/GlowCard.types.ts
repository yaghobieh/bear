import type { HTMLAttributes, ReactNode } from 'react';

export type GlowEffect = 'ambient' | 'border' | 'spotlight' | 'pulse' | 'wave';

export interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Glow color (CSS color value) */
  glowColor?: string;
  /** Glow intensity (0–100, controls blur/spread) */
  glowIntensity?: number;
  /** Whether glow follows the mouse position */
  followMouse?: boolean;
  /** Border radius */
  borderRadius?: number | string;
  /** Disable glow animation */
  disabled?: boolean;
  /** Glow effect style */
  effect?: GlowEffect;
  /** Border width for 'border' effect (px) */
  borderWidth?: number;
  /** Test ID */
  testId?: string;
}
