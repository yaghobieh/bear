import type { PropRow } from '@/components/PropsTable';

export const THINKING_BLOCK_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Trigger label' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state' },
  { name: 'isStreaming', type: 'boolean', default: 'false', description: 'Reasoning in progress' },
  { name: 'children', type: 'ReactNode', description: 'Reasoning body' },
];

export const THINKING_BLOCK_CODE = `<ThinkingBlock defaultOpen>Checking sources.</ThinkingBlock>`;
export const THINKING_BLOCK_DEMO = 'Checking sources and drafting a reply.';
