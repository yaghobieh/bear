import {
  BOOLEAN_FALSE,
  EMPTY_STRING,
  LABEL_ATTACH,
  LABEL_SEND,
  LABEL_STOP,
  PLACEHOLDER_START_TYPING,
} from '@const';
import type { PromptComposerTranslations } from './PromptComposer.types';

export const PROMPT_COMPOSER_DEFAULT_TRANSLATIONS: PromptComposerTranslations = {
  placeholder: PLACEHOLDER_START_TYPING,
  sendLabel: LABEL_SEND,
  stopLabel: LABEL_STOP,
  attachLabel: LABEL_ATTACH,
};

export const PROMPT_COMPOSER_DEFAULT_DISABLED = BOOLEAN_FALSE;
export const PROMPT_COMPOSER_DEFAULT_STREAMING = BOOLEAN_FALSE;
export const PROMPT_COMPOSER_DEFAULT_ATTACH = BOOLEAN_FALSE;
export const PROMPT_COMPOSER_DEFAULT_VALUE = EMPTY_STRING;
