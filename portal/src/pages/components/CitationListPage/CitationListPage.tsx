import { CitationList } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CITATION_LIST_CODE, CITATION_LIST_ITEMS, CITATION_LIST_PROPS } from './CitationListPage.const';

const CitationListPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="CitationList" description={t.citationListDesc} componentName="CitationList">
      <ComponentPreview title={t.basic} description={t.citationListDesc} code={CITATION_LIST_CODE}>
        <CitationList citations={CITATION_LIST_ITEMS} />
      </ComponentPreview>
      <PropsTable title={t.props} rows={CITATION_LIST_PROPS} />
    </DocPage>
  );
};

export default CitationListPage;
