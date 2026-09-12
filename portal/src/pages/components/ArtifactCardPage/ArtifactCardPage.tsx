import { ArtifactCard, Typography } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { ARTIFACT_CARD_CODE, ARTIFACT_CARD_DOC_CODE, ARTIFACT_CARD_PROPS } from './ArtifactCardPage.const';

const ArtifactCardPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ArtifactCard" description={t.artifactCardDesc} componentName="ArtifactCard">
      <ComponentPreview title={t.basic} description={t.artifactCardDesc} code={ARTIFACT_CARD_CODE}>
        <ArtifactCard title="composer.tsx" kind="code">
          <Typography variant="code">{'<PromptComposer onSubmit={send} />'}</Typography>
        </ArtifactCard>
      </ComponentPreview>
      <ComponentPreview title={t.anotherExample} description={t.artifactCardDesc} code={ARTIFACT_CARD_DOC_CODE}>
        <ArtifactCard title="Release notes" kind="doc">
          <Typography>Chart grow animation and the component catalog.</Typography>
        </ArtifactCard>
      </ComponentPreview>
      <PropsTable title={t.props} rows={ARTIFACT_CARD_PROPS} />
    </DocPage>
  );
};

export default ArtifactCardPage;
