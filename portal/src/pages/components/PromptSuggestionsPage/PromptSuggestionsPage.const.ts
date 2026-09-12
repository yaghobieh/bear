import type { PropRow } from '@/components/PropsTable';
import type { PromptSuggestionItem } from '@forgedevstack/bear';

export const PROMPT_SUGGESTIONS_ITEMS: PromptSuggestionItem[] = [
  { id: 'plan', label: 'Draft a plan' },
  { id: 'cite', label: 'Cite sources' },
  { id: 'chart', label: 'Show a chart' },
];

export const PROMPT_SUGGESTIONS_PROPS: PropRow[] = [
  { name: 'suggestions', type: 'PromptSuggestionItem[]', description: 'Chip starters' },
  { name: 'selectedId', type: 'string', description: 'Highlighted suggestion id' },
  { name: 'onSelect', type: '(id: string) => void', description: 'Fired when a chip is chosen' },
];

export const PROMPT_SUGGESTIONS_CODE = `import { useState } from 'react';
import { PromptComposer, PromptSuggestions } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const suggestions = [
  { id: 'plan', label: 'Draft a plan' },
  { id: 'cite', label: 'Cite sources' },
  { id: 'chart', label: 'Show a chart' },
];

export default function App() {
  const [draft, setDraft] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (id: string) => {
    const selected = suggestions.find((item) => item.id === id);
    setSelectedId(id);
    if (selected) {
      setDraft(selected.label);
    }
  };

  return (
    <>
      <PromptSuggestions
        suggestions={suggestions}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <PromptComposer
        value={draft}
        onChange={setDraft}
        onSubmit={() => setDraft('')}
      />
    </>
  );
}
`;
