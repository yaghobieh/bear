import { FC } from 'react';
import {
  AppBar,
  Button,
  Card,
  CardBody,
  Flex,
  PageHeader,
  Sidebar,
  StatCard,
  Typography,
} from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { CodeBlock } from '@/components/CodeBlock';

const DashboardKitPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="fade-in">
      <PageHeader title={t.templateDashboardTitle} description={t.templateDashboardDesc} />
      <div className="mb-8">
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`import { AppBar, PageHeader, Sidebar, StatCard, Card } from '@forgedevstack/bear';`}
        />
      </div>
      <Card variant="outlined" padding="none" className="overflow-hidden">
        <AppBar dense leftContent={<Typography className="font-semibold">Forge Ops</Typography>} />
        <Flex>
          <Sidebar
            items={[
              { id: 'overview', label: t.templateNavOverview },
              { id: 'reports', label: t.templateNavReports },
            ]}
            activeItemId="overview"
            className="w-56 min-h-[280px]"
          />
          <div className="flex-1 p-6 space-y-4">
            <PageHeader
              title={t.templateDashboardTitle}
              description={t.templateDashboardDesc}
              actions={<Button size="sm">{t.templatePrimaryAction}</Button>}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title={t.templateStatUsers} value="12.4k" />
              <StatCard title={t.templateStatRevenue} value="$84k" />
              <StatCard title={t.templateStatLatency} value="128ms" />
            </div>
            <CardBody>
              <Typography variant="body2">{t.templateDashboardBody}</Typography>
            </CardBody>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default DashboardKitPage;
