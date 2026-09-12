import { useState } from 'react';
import { ModelSelect } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { MODEL_SELECT_CODE, MODEL_SELECT_OPTIONS, MODEL_SELECT_PROPS } from './ModelSelectPage.const';

const ModelSelectPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [model, setModel] = useState(MODEL_SELECT_OPTIONS[0].id);

  return (
    <DocPage title="ModelSelect" description={t.modelSelectDesc} componentName="ModelSelect">
      <ComponentPreview title={t.basic} description={t.modelSelectDesc} code={MODEL_SELECT_CODE}>
        <ModelSelect models={MODEL_SELECT_OPTIONS} value={model} onChange={setModel} />
      </ComponentPreview>
      <PropsTable title={t.props} rows={MODEL_SELECT_PROPS} />
    </DocPage>
  );
};

export default ModelSelectPage;
