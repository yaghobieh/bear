import {
  BEAR_ID_MAX_LENGTH,
  BEAR_ID_NUMERIC_MAX,
  BEAR_ID_NUMERIC_MIN,
  BEAR_ID_PREFIX,
  BEAR_ID_SEPARATOR,
} from './generateBearId.const';
import type { GenerateBearIdOptions } from './generateBearId.types';

const toSnakeCase = (componentName: string): string =>
  componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase();

const createNumericSegment = (): string =>
  String(Math.floor(Math.random() * (BEAR_ID_NUMERIC_MAX - BEAR_ID_NUMERIC_MIN + 1)) + BEAR_ID_NUMERIC_MIN);

const sanitizeSuffix = (suffix?: string): string | undefined => {
  if (!suffix) {
    return undefined;
  }
  const cleaned = suffix.replace(/[^a-zA-Z0-9_]/g, '');
  return cleaned.length > 0 ? cleaned : undefined;
};

const buildId = (componentSlug: string, segment: string, suffix?: string): string => {
  const parts = [BEAR_ID_PREFIX, componentSlug, segment];
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
  const name = options?.componentName ?? componentName ?? 'component';
  const slug = toSnakeCase(name);
  return buildId(slug, createNumericSegment(), options?.suffix);
};

const hashReactIdToNumericSegment = (reactId: string): string => {
  let hash = 0;
  for (let i = 0; i < reactId.length; i += 1) {
    hash = (hash * 31 + reactId.charCodeAt(i)) >>> 0;
  }
  const range = BEAR_ID_NUMERIC_MAX - BEAR_ID_NUMERIC_MIN + 1;
  return String((hash % range) + BEAR_ID_NUMERIC_MIN);
};

export const formatBearId = (componentName: string, reactId: string): string => {
  const slug = toSnakeCase(componentName);
  return buildId(slug, hashReactIdToNumericSegment(reactId));
};

export const resolveBearId = (id: string | undefined, generatedId: string): string =>
  id ?? generatedId;
