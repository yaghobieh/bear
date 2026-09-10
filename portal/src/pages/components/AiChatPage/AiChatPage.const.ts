import type { PropRow } from '@/components/PropsTable';
import type { PromptSuggestionItem } from '@forgedevstack/bear';

export const AI_CHAT_SUGGESTIONS: PromptSuggestionItem[] = [
  { id: 'plan', label: 'Draft a plan' },
  { id: 'cite', label: 'Cite sources' },
];

export const AI_CHAT_CONTEXT_USED = 72;
export const AI_CHAT_CONTEXT_MAX = 100;

export const AI_CHAT_MODELS = [
  { id: 'forge-small', label: 'Forge Small' },
  { id: 'forge-large', label: 'Forge Large' },
];

export const AI_CHAT_CITATIONS = [
  { id: '1', title: 'Bear Chat API', href: '/components/chat', excerpt: 'Composer, streaming, and live region' },
];

export const AI_KIT_PROPS: PropRow[] = [
  { name: 'PromptComposer', type: 'component', description: 'Multiline prompt, attach, send, and stop' },
  { name: 'StreamingMessage', type: 'component', description: 'Live assistant text with a cursor' },
  { name: 'ThinkingBlock', type: 'component', description: 'Collapsible reasoning block' },
  { name: 'PromptSuggestions', type: 'component', description: 'Chip starters for the next prompt' },
  { name: 'MessageActions', type: 'component', description: 'Copy, retry, good, and bad' },
  { name: 'ChatError', type: 'component', description: 'Inline failure with retry' },
  { name: 'ToolCall', type: 'component', description: 'Search, plan, edit, or generic tool status' },
  { name: 'CitationList', type: 'component', description: 'Source list under a reply' },
  { name: 'ApprovalCard', type: 'component', description: 'Approve or reject a proposed action' },
  { name: 'ModelSelect', type: 'component', description: 'Pick the generation model' },
  { name: 'ContextMeter', type: 'component', description: 'Token or context usage meter' },
  { name: 'ArtifactCard', type: 'component', description: 'Code, doc, or preview artifact' },
];

export const AI_CHAT_CODE = `import {
  ArtifactCard,
  ApprovalCard,
  CitationList,
  ContextMeter,
  MessageActions,
  ModelSelect,
  PromptComposer,
  PromptSuggestions,
  StreamingMessage,
  ThinkingBlock,
  ToolCall,
} from '@forgedevstack/bear';`;
