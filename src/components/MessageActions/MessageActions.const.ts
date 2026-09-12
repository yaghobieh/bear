import {
  LABEL_BAD_RESPONSE,
  LABEL_COPY,
  LABEL_GOOD_RESPONSE,
  LABEL_RETRY,
} from '@const';
import type { MessageActionsTranslations } from './MessageActions.types';

export const MESSAGE_ACTIONS_DEFAULT_TRANSLATIONS: MessageActionsTranslations = {
  copyLabel: LABEL_COPY,
  retryLabel: LABEL_RETRY,
  goodLabel: LABEL_GOOD_RESPONSE,
  badLabel: LABEL_BAD_RESPONSE,
};
