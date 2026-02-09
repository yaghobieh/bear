import type { TerminalLineType } from './Terminal.types';

export const TERMINAL_DEFAULTS = {
  HEIGHT: 400,
  USER: 'user',
  HOST: 'localhost',
  CWD: '~',
  TITLE: 'Terminal',
} as const;

export const LINE_TYPE_COLORS: Record<TerminalLineType, string> = {
  input: 'inherit',
  output: 'inherit',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
  system: '#a855f7',
} as const;

export const TERMINAL_THEMES = {
  dark: {
    bg: '#1a1a2e',
    text: '#eaeaea',
    prompt: '#22c55e',
    border: '#2d2d44',
    header: '#16162a',
  },
  light: {
    bg: '#fafafa',
    text: '#1a1a2e',
    prompt: '#16a34a',
    border: '#e5e5e5',
    header: '#f0f0f0',
  },
  matrix: {
    bg: '#0d0d0d',
    text: '#00ff00',
    prompt: '#00ff00',
    border: '#003300',
    header: '#0a0a0a',
  },
} as const;
