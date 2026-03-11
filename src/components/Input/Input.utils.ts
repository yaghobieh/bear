import {
  capitalize,
  titleCase,
  sentenceCase,
} from '@forgedevstack/anvil';
import type { AutoFormatType } from './Input.types';

const toUpperCase = (str: string): string => str.toUpperCase();
const toLowerCase = (str: string): string => str.toLowerCase();

const FORMAT_MAP: Record<Exclude<AutoFormatType, 'none'>, (str: string) => string> = {
  capitalize,
  uppercase: toUpperCase,
  lowercase: toLowerCase,
  titleCase,
  sentenceCase,
};

export const applyAutoFormat = (value: string, format: AutoFormatType | undefined): string => {
  if (!format || format === 'none') return value;
  const fn = FORMAT_MAP[format];
  return fn ? fn(value) : value;
};
