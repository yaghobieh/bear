/**
 * Terminal component types
 */

import type { ReactNode } from 'react';

export type TerminalLineType = 'input' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system';

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  content: string | ReactNode;
  timestamp?: Date;
  prefix?: string;
}

export interface TerminalProps {
  /** Array of terminal lines */
  lines: TerminalLine[];
  /** Callback when user submits a command */
  onCommand?: (command: string) => void;
  /** Current working directory to display */
  cwd?: string;
  /** Username to display */
  user?: string;
  /** Hostname to display */
  host?: string;
  /** Shell prompt prefix (overrides user@host) */
  prompt?: string | ReactNode;
  /** Title in the header */
  title?: string;
  /** Show header with controls */
  showHeader?: boolean;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show timestamps */
  showTimestamps?: boolean;
  /** Read-only mode (no input) */
  readOnly?: boolean;
  /** Height of the terminal */
  height?: number | string;
  /** Theme variant */
  theme?: 'dark' | 'light' | 'matrix';
  /** Command history */
  history?: string[];
  /** Callback when history changes */
  onHistoryChange?: (history: string[]) => void;
  /** Auto-scroll to bottom */
  autoScroll?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Loading state */
  isLoading?: boolean;
}
