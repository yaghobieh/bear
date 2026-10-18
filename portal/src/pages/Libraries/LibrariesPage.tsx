import { FC } from 'react';
import { BarChart } from '@forgedevstack/bear-x-charts';
import { Badge, Card, CardBody, CardHeader, Flex, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  BEAR_CLI_ADD,
  BEAR_LIBRARIES,
  LIBRARY_CHART_DATA,
  LIBRARY_CHART_HEIGHT,
  LIBRARY_IMPORT_SAMPLE,
} from './LibrariesPage.const';

const LibrariesPage: FC = () => {
  const { language } = usePortalLanguage();
  const text = DOCS_TEXT[language];

  return (
    <DocPage title={text.librariesTitle} description={text.librariesDesc} badge="1.3.5">
      <Flex wrap="wrap" gap={2} className="mb-8">
        <a className="inline-flex items-center rounded-lg border border-pink-500 px-3 py-1.5 text-sm font-medium text-pink-600 dark:text-pink-400" href="https://bundlephobia.com/package/@forgedevstack/bear" target="_blank" rel="noreferrer">
          {text.librariesBundle} · @forgedevstack/bear
        </a>
        <a className="inline-flex items-center rounded-lg border border-pink-500 px-3 py-1.5 text-sm font-medium text-pink-600 dark:text-pink-400" href="https://bundlephobia.com/package/@forgedevstack/bear-icons" target="_blank" rel="noreferrer">
          {text.librariesBundle} · @forgedevstack/bear-icons
        </a>
      </Flex>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{text.librariesImport}</Typography>
        <CodeBlock code={LIBRARY_IMPORT_SAMPLE} language="tsx" showLineNumbers={false} />
        <BarChart data={LIBRARY_CHART_DATA} height={LIBRARY_CHART_HEIGHT} showLabels />
      </section>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{text.librariesCli}</Typography>
        <CodeBlock code={BEAR_CLI_ADD} language="bash" showLineNumbers={false} />
      </section>

      <Flex direction="column" gap={4}>
        {BEAR_LIBRARIES.map((library) => (
          <Card key={library.id} id={library.id} className="scroll-mt-24">
            <CardHeader>
              <Flex gap={2} align="center">
                <Typography variant="h5">{library.name}</Typography>
                <Badge variant={library.kind === 'x' ? 'primary' : 'neutral'}>
                  {library.kind === 'x' ? text.librariesKindX : text.librariesKindSeparate}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody>
              <Typography variant="body2" className="mb-3">{text[library.summaryKey]}</Typography>
              <CodeBlock code={library.install} language="bash" showLineNumbers={false} />
              <a
                className="mt-3 inline-flex items-center rounded-lg border border-pink-500 px-3 py-1.5 text-sm font-medium text-pink-600 dark:text-pink-400"
                href={`https://bundlephobia.com/package/${library.name}`}
                target="_blank"
                rel="noreferrer"
              >
                {text.librariesBundle}
              </a>
              <Typography variant="caption" className="mt-3 block">{library.components.join(', ')}</Typography>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </DocPage>
  );
};

export default LibrariesPage;
