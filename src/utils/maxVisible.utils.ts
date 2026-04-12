import type { BearTheme } from '../types';

export type MaxVisibleByBreakpoint = {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  custom?: number;
};

export type MaxVisibleInput = number | MaxVisibleByBreakpoint;

function parseBp(value: string | undefined, fallback: number): number {
  if (value == null) return fallback;
  const n = parseInt(String(value).replace('px', ''), 10);
  return Number.isNaN(n) ? fallback : n;
}

export function resolveMaxVisible(
  input: MaxVisibleInput | undefined,
  opts: {
    width: number;
    theme: BearTheme;
  }
): number | undefined {
  if (input === undefined) return undefined;
  if (typeof input === 'number') return input;
  if (input.custom != null) return input.custom;
  const md = parseBp(opts.theme.breakpoints.md, 768);
  const lg = parseBp(opts.theme.breakpoints.lg, 1024);
  const w = opts.width;
  if (w < md) {
    return input.mobile ?? input.tablet ?? input.desktop ?? 3;
  }
  if (w < lg) {
    return input.tablet ?? input.desktop ?? input.mobile ?? 4;
  }
  return input.desktop ?? input.tablet ?? input.mobile ?? 5;
}
