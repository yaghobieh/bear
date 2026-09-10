import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';
import type { StreamingMessageSender, StreamingMessageTranslations } from './StreamingMessage.types';

export const STREAMING_MESSAGE_DEFAULT_TRANSLATIONS: StreamingMessageTranslations = {
  streamingLabel: 'Streaming',
};

export const STREAMING_MESSAGE_DEFAULT_SENDER: StreamingMessageSender = 'assistant';
export const STREAMING_MESSAGE_DEFAULT_STREAMING = BOOLEAN_FALSE;
export const STREAMING_MESSAGE_DEFAULT_LIVE = BOOLEAN_TRUE;
