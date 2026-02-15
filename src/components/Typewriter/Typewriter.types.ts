export interface TypewriterProps {
  /** Text or array of texts to type */
  text: string | string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before starting to type */
  startDelay?: number;
  /** Delay before deleting (when looping) */
  deleteDelay?: number;
  /** Delete speed in ms per character */
  deleteSpeed?: number;
  /** Whether to loop through texts */
  loop?: boolean;
  /** Whether to show cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Cursor blink speed in ms */
  cursorBlinkSpeed?: number;
  /** Called when typing is complete */
  onComplete?: () => void;
  /** Called when a word is complete (in multi-text mode) */
  onWordComplete?: (index: number) => void;
  /** HTML tag to render */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
