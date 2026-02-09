export interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  rotationSpeed: number;
  shape: 'square' | 'circle' | 'triangle';
}

export interface ConfettiProps {
  /** Whether confetti is active */
  active?: boolean;
  /** Number of confetti pieces */
  count?: number;
  /** Duration in ms before confetti disappears */
  duration?: number;
  /** Custom colors array */
  colors?: string[];
  /** Confetti origin x position (0-1) */
  originX?: number;
  /** Confetti origin y position (0-1) */
  originY?: number;
  /** Spread angle in degrees */
  spread?: number;
  /** Initial velocity */
  velocity?: number;
  /** Gravity effect */
  gravity?: number;
  /** Whether to auto-hide after duration */
  autoHide?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface UseConfettiReturn {
  /** Fire confetti */
  fire: () => void;
  /** Stop confetti */
  stop: () => void;
  /** Whether confetti is active */
  isActive: boolean;
}
