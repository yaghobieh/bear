import { useState } from 'react';
import { Flex, PromptComposer, PromptSuggestions, Typography } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  PROMPT_SUGGESTIONS_CODE,
  PROMPT_SUGGESTIONS_ITEMS,
  PROMPT_SUGGESTIONS_PROPS,
} from './PromptSuggestionsPage.const';

const PromptSuggestionsPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [draft, setDraft] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (id: string) => {
    const selected = PROMPT_SUGGESTIONS_ITEMS.find((item) => item.id === id);
    setSelectedId(id);
    if (selected) {
      setDraft(selected.label);
    }
  };

  return (
    <DocPage title="PromptSuggestions" description={t.promptSuggestionsDesc} componentName="PromptSuggestions">
      <ComponentPreview title={t.basic} description={t.promptSuggestionsLiveDesc} code={PROMPT_SUGGESTIONS_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <PromptSuggestions
            suggestions={PROMPT_SUGGESTIONS_ITEMS}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          <PromptComposer value={draft} onChange={setDraft} onSubmit={() => setDraft('')} />
          {draft && (
            <Typography variant="caption" color="muted">
              {t.promptSuggestionsPicked} {draft}
            </Typography>
          )}
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={PROMPT_SUGGESTIONS_PROPS} />
    </DocPage>
  );
};

export default PromptSuggestionsPage;
