import type { ValidationRule } from './Form.types';
import { EMAIL_REGEX, FORM_DEFAULT_TRANSLATIONS } from './Form.const';

/**
 * Validate a single field value against rules
 */
export const validateFieldValue = async (
  value: unknown,
  rules: ValidationRule
): Promise<string | null> => {
  const stringValue = typeof value === 'string' ? value : String(value ?? '');
  const numValue = typeof value === 'number' ? value : Number(value);

  // Required validation
  if (rules.required) {
    const isEmpty = value === undefined || value === null || stringValue.trim() === '';
    if (isEmpty) {
      return typeof rules.required === 'string'
        ? rules.required
        : FORM_DEFAULT_TRANSLATIONS.required;
    }
  }

  // Skip other validations if value is empty
  if (value === undefined || value === null || stringValue === '') {
    return null;
  }

  // Email validation
  if (rules.email) {
    if (!EMAIL_REGEX.test(stringValue)) {
      return typeof rules.email === 'string'
        ? rules.email
        : FORM_DEFAULT_TRANSLATIONS.email;
    }
  }

  // MinLength validation
  if (rules.minLength) {
    if (stringValue.length < rules.minLength.value) {
      return rules.minLength.message;
    }
  }

  // MaxLength validation
  if (rules.maxLength) {
    if (stringValue.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }
  }

  // Min validation (for numbers)
  if (rules.min) {
    if (!isNaN(numValue) && numValue < rules.min.value) {
      return rules.min.message;
    }
  }

  // Max validation (for numbers)
  if (rules.max) {
    if (!isNaN(numValue) && numValue > rules.max.value) {
      return rules.max.message;
    }
  }

  // Pattern validation
  if (rules.pattern) {
    if (!rules.pattern.value.test(stringValue)) {
      return rules.pattern.message;
    }
  }

  // Custom validation
  if (rules.validate) {
    const result = await rules.validate(value);
    if (typeof result === 'string') {
      return result;
    }
    if (result === false) {
      return FORM_DEFAULT_TRANSLATIONS.pattern;
    }
  }

  return null;
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as T;
  }
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

/**
 * Get nested value from object by path
 */
export const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
};

/**
 * Set nested value in object by path
 */
export const setNestedValue = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> => {
  const keys = path.split('.');
  const result = deepClone(obj);
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
};
