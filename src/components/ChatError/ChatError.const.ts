import { LABEL_RETRY } from '@const';
import type { ChatErrorTranslations } from './ChatError.types';

export const CHAT_ERROR_DEFAULT_TRANSLATIONS: ChatErrorTranslations = {
  title: 'Something went wrong',
  retryLabel: LABEL_RETRY,
};
