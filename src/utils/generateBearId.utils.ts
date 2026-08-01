import {
  BEAR_ID_MAX_LENGTH,
  BEAR_ID_PREFIX,
  BEAR_ID_SEGMENT_DIGIT_LENGTH,
  BEAR_ID_SEGMENT_LETTERS,
  BEAR_ID_SEPARATOR,
} from './generateBearId.const';
import type { GenerateBearIdOptions } from './generateBearId.types';

const toPascalCase = (componentName: string): string => {
  const cleaned = componentName.replace(/[^a-zA-Z0-9]/g, '');
  if (!cleaned) {
    return 'Component';
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const createAlphanumericSegment = (): string => {
  const letterIndex = Math.floor(Math.random() * BEAR_ID_SEGMENT_LETTERS.length);
  const letter = BEAR_ID_SEGMENT_LETTERS.charAt(letterIndex);
  let digits = '';
  for (let i = 0; i < BEAR_ID_SEGMENT_DIGIT_LENGTH; i += 1) {
    digits += String(Math.floor(Math.random() * 10));
  }
  return `${letter}${digits}`;
};

const sanitizeSuffix = (suffix?: string): string | undefined => {
  if (!suffix) {
    return undefined;
  }
  const cleaned = suffix.replace(/[^a-zA-Z0-9]/g, '');
  return cleaned.length > 0 ? cleaned : undefined;
};

const buildId = (componentName: string, segment: string, suffix?: string): string => {
  const parts = [BEAR_ID_PREFIX, componentName, segment];
  const cleanedSuffix = sanitizeSuffix(suffix);
  if (cleanedSuffix) {
    parts.push(cleanedSuffix);
  }
  const id = parts.join(BEAR_ID_SEPARATOR);
  return id.length > BEAR_ID_MAX_LENGTH ? id.slice(0, BEAR_ID_MAX_LENGTH) : id;
};

export const generateBearId = (
  componentName?: string,
  options?: GenerateBearIdOptions,
): string => {
  const name = options?.componentName ?? componentName ?? 'Component';
  const pascalName = toPascalCase(name);
  return buildId(pascalName, createAlphanumericSegment(), options?.suffix);
};

const hashReactIdToAlphanumericSegment = (reactId: string): string => {
  let hash = 0;
  for (let i = 0; i < reactId.length; i += 1) {
    hash = (hash * 31 + reactId.charCodeAt(i)) >>> 0;
  }
  const letter = BEAR_ID_SEGMENT_LETTERS.charAt(hash % BEAR_ID_SEGMENT_LETTERS.length);
  let digits = '';
  let remaining = hash;
  for (let i = 0; i < BEAR_ID_SEGMENT_DIGIT_LENGTH; i += 1) {
    digits += String(remaining % 10);
    remaining = Math.floor(remaining / 10) + ((hash >>> (i % 16)) & 0xffff);
  }
  return `${letter}${digits}`;
};

export const formatBearId = (componentName: string, reactId: string): string => {
  const pascalName = toPascalCase(componentName);
  return buildId(pascalName, hashReactIdToAlphanumericSegment(reactId));
};

export const resolveBearId = (id: string | undefined, generatedId: string): string =>
  id ?? generatedId;
