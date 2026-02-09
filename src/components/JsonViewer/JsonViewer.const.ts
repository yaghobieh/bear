import type { JsonViewerTheme } from './JsonViewer.types';

export const DEFAULT_EXPAND_DEPTH = 2;

export const DEFAULT_THEME: JsonViewerTheme = {
  background: 'var(--bear-bg-secondary, #f5f5f5)',
  text: 'var(--bear-text-primary, #171717)',
  string: '#22c55e',
  number: '#3b82f6',
  boolean: '#f59e0b',
  null: '#ef4444',
  key: '#ec4899',
  bracket: 'var(--bear-text-secondary, #737373)',
  punctuation: 'var(--bear-text-tertiary, #a3a3a3)',
};

export const DARK_THEME: JsonViewerTheme = {
  background: 'var(--bear-bg-secondary, #262626)',
  text: 'var(--bear-text-primary, #fafafa)',
  string: '#4ade80',
  number: '#60a5fa',
  boolean: '#fbbf24',
  null: '#f87171',
  key: '#f472b6',
  bracket: 'var(--bear-text-secondary, #a3a3a3)',
  punctuation: 'var(--bear-text-tertiary, #737373)',
};
