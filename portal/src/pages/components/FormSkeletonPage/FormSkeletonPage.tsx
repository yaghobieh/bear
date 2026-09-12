import { Flex, FormSkeleton, Typography } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  FORM_SKELETON_CODE,
  FORM_SKELETON_FIELDS,
  FORM_SKELETON_PROPS,
  FORM_SKELETON_STATIC_CODE,
} from './FormSkeletonPage.const';

const FormSkeletonPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="FormSkeleton" description={t.formSkeletonDesc} componentName="FormSkeleton">
      <ComponentPreview title={t.basic} description={t.formSkeletonDesc} code={FORM_SKELETON_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <Typography variant="caption" color="muted">
            {t.formSkeletonHint}
          </Typography>
          <FormSkeleton fields={FORM_SKELETON_FIELDS} />
        </Flex>
      </ComponentPreview>
      <ComponentPreview title={t.anotherExample} description={t.formSkeletonHint} code={FORM_SKELETON_STATIC_CODE}>
        <FormSkeleton fields={2} animation="none" />
      </ComponentPreview>
      <PropsTable title={t.props} rows={FORM_SKELETON_PROPS} />
    </DocPage>
  );
};

export default FormSkeletonPage;
