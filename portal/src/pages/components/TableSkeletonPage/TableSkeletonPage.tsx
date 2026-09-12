import { TableSkeleton } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { TABLE_SKELETON_CODE, TABLE_SKELETON_COLUMNS, TABLE_SKELETON_PROPS, TABLE_SKELETON_ROWS } from './TableSkeletonPage.const';

const TableSkeletonPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="TableSkeleton" description={t.tableSkeletonDesc} componentName="TableSkeleton">
      <ComponentPreview title={t.basic} description={t.tableSkeletonDesc} code={TABLE_SKELETON_CODE}>
        <TableSkeleton rows={TABLE_SKELETON_ROWS} columns={TABLE_SKELETON_COLUMNS} />
      </ComponentPreview>
      <PropsTable title={t.props} rows={TABLE_SKELETON_PROPS} />
    </DocPage>
  );
};

export default TableSkeletonPage;
