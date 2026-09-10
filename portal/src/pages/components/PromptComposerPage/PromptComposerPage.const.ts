import type { PropRow } from '@/components/PropsTable';

export const PROMPT_COMPOSER_PROPS: PropRow[] = [
  { name: 'value', type: 'string', description: 'Controlled draft' },
  { name: 'onChange', type: '(value: string) => void', description: 'Draft change' },
  { name: 'onSubmit', type: '(value: string) => void', description: 'Enter or send' },
  { name: 'onStop', type: '() => void', description: 'Shown while isStreaming' },
  { name: 'allowAttach', type: 'boolean', default: 'false', description: 'Show attach control' },
  { name: 'isStreaming', type: 'boolean', default: 'false', description: 'Swap send for stop' },
];

export const PROMPT_COMPOSER_CODE = `<PromptComposer onSubmit={send} allowAttach />`;
