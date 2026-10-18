import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody, Flex, Typography } from '@forgedevstack/bear';
import { ChartLive } from './ChartLive';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CHART_DOCS, CHART_PROPS } from './ChartPage.const';

const ChartPage = () => {
  const { pathname } = useLocation();
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const doc = CHART_DOCS.find((item) => item.path === pathname);

  if (!doc) {
    return (
      <DocPage title="Chart" description={t.chartDesc} componentName="Chart">
        <Flex direction="column" gap={3}>
          {CHART_DOCS.map((item) => (
            <Link key={item.path} to={item.path}>
              <Card>
                <CardBody>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body2" color="secondary">{item.description}</Typography>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Flex>
      </DocPage>
    );
  }

  return (
    <DocPage title={doc.title} description={doc.description} componentName="Chart">
      <ComponentPreview title={doc.title} description={doc.description} code={doc.code}>
        <ChartLive id={doc.id} type={doc.type} data={doc.data} height={doc.height} pieView={doc.pieView} />
      </ComponentPreview>
      <PropsTable title={t.props} rows={CHART_PROPS} />
    </DocPage>
  );
};

export default ChartPage;
