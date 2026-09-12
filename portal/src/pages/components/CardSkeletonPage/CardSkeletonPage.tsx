import { CardSkeleton } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CARD_SKELETON_CODE, CARD_SKELETON_PROPS } from './CardSkeletonPage.const';

const CardSkeletonPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="CardSkeleton" description={t.cardSkeletonDesc} componentName="CardSkeleton">
      <ComponentPreview title={t.basic} description={t.cardSkeletonDesc} code={CARD_SKELETON_CODE}>
        <CardSkeleton />
      </ComponentPreview>
      <PropsTable title={t.props} rows={CARD_SKELETON_PROPS} />
    </DocPage>
  );
};

export default CardSkeletonPage;
