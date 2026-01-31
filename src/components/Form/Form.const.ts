import { FormTranslations, FormState } from './Form.types';

/**
 * Default form translations
 */
export const FORM_DEFAULT_TRANSLATIONS: FormTranslations = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: 'Must be at least {min} characters',
  maxLength: 'Must be no more than {max} characters',
  min: 'Must be at least {min}',
  max: 'Must be no more than {max}',
  pattern: 'Invalid format',
};

/**
 * Initial form state
 */
export const FORM_INITIAL_STATE: FormState = {
  fields: {},
  isSubmitting: false,
  isValid: true,
  isSubmitted: false,
  errors: {},
};

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Layout classes
 */
export const FORM_LAYOUT_CLASSES = {
  vertical: 'Bear-Form--vertical bear-flex bear-flex-col bear-gap-4',
  horizontal: 'Bear-Form--horizontal bear-flex bear-flex-col bear-gap-4',
  inline: 'Bear-Form--inline bear-flex bear-flex-wrap bear-items-end bear-gap-4',
} as const;

/**
 * Form item layout classes
 */
export const FORM_ITEM_LAYOUT_CLASSES = {
  vertical: 'Bear-FormItem--vertical bear-flex bear-flex-col bear-gap-1.5',
  horizontal: 'Bear-FormItem--horizontal bear-flex bear-flex-row bear-items-start bear-gap-4',
  inline: 'Bear-FormItem--inline bear-flex bear-flex-col bear-gap-1',
} as const;

/**
 * Label width for horizontal layout
 */
export const FORM_LABEL_WIDTH_HORIZONTAL = 'bear-w-32 bear-shrink-0';
