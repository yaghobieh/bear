import { Flex, StatCard } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { STAT_CARD_CODE, STAT_CARD_PROPS } from './StatCardPage.const';

const StatCardPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="StatCard" description={t.statCardDesc} componentName="StatCard">
      <ComponentPreview title={t.basic} description={t.statCardDesc} code={STAT_CARD_CODE}>
        <Flex gap={4} wrap="wrap">
          <StatCard title="Users" value="1.2k" />
          <StatCard title="Revenue" value="$48k" color="#8b5cf6" />
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={STAT_CARD_PROPS} />
    </DocPage>
  );
};

export default StatCardPage;
