import { ActivityItem, Badge } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { ACTIVITY_ITEM_CODE, ACTIVITY_ITEM_PROPS } from './ActivityItemPage.const';

const ActivityItemPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ActivityItem" description={t.activityItemDesc} componentName="ActivityItem">
      <ComponentPreview title={t.basic} description={t.activityItemDesc} code={ACTIVITY_ITEM_CODE}>
        <ActivityItem
          icon={<Badge variant="primary" size="sm">A</Badge>}
          title="Published a post"
          description="Release notes for Chart and the component catalog."
          time="2m"
          user="Ada"
        />
      </ComponentPreview>
      <PropsTable title={t.props} rows={ACTIVITY_ITEM_PROPS} />
    </DocPage>
  );
};

export default ActivityItemPage;
