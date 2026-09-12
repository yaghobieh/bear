import { useState } from 'react';
import { PromptComposer } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PROMPT_COMPOSER_CODE, PROMPT_COMPOSER_PROPS } from './PromptComposerPage.const';

const PromptComposerPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [value, setValue] = useState('');

  return (
    <DocPage title="PromptComposer" badge="New" description={t.aiChatComposer} componentName="PromptComposer">
      <ComponentPreview title={t.aiChatComposer} description={t.aiChatComposer} code={PROMPT_COMPOSER_CODE}>
        <PromptComposer value={value} onChange={setValue} onSubmit={() => setValue('')} allowAttach />
      </ComponentPreview>
      <PropsTable title={t.props} rows={PROMPT_COMPOSER_PROPS} />
    </DocPage>
  );
};

export default PromptComposerPage;
