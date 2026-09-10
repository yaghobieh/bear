import type { PropRow } from '@/components/PropsTable';

export const STREAMING_MESSAGE_PROPS: PropRow[] = [
  { name: 'content', type: 'ReactNode', description: 'Message body' },
  { name: 'isStreaming', type: 'boolean', default: 'false', description: 'Show cursor and live region' },
  { name: 'sender', type: "'user' | 'assistant' | 'bot' | 'system'", default: 'assistant', description: 'Speaker' },
  { name: 'live', type: 'boolean', default: 'true', description: 'Announce updates' },
];

export const STREAMING_MESSAGE_CODE = `<StreamingMessage content={text} isStreaming />`;
export const STREAMING_MESSAGE_DEMO = 'Streaming tokens land here.';
