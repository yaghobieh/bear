import { FC, useState } from 'react';
import {
  AppBar,
  AppShell,
  Button,
  PageHeader,
  Sidebar,
  Typography,
} from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const AppShellPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AppShell</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        App chrome layout with header, navbar, main, optional aside, and footer slots. Built for
        dashboard and admin shells.
      </p>
      <div className="mb-8">
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`import { AppShell, AppBar, Sidebar, PageHeader } from '@forgedevstack/bear';`}
        />
      </div>
      <ComponentPreview
        title="Basic shell"
        description="Header + navbar + main content."
        code={`<AppShell
  header={<AppBar leftContent="Forge Ops" dense />}
  navbar={<Sidebar items={items} activeItemId="overview" />}
>
  <PageHeader title="Overview" />
</AppShell>`}
      >
        <div className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden h-[360px]">
          <AppShell
            className="h-full"
            header={
              <AppBar
                dense
                leftContent={<Typography className="font-semibold">Forge Ops</Typography>}
                rightContent={
                  <Button size="sm" variant="outline" onClick={() => setCollapsed((v) => !v)}>
                    {collapsed ? 'Expand nav' : 'Collapse nav'}
                  </Button>
                }
              />
            }
            navbar={
              <Sidebar
                items={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'reports', label: 'Reports' },
                  { id: 'settings', label: 'Settings' },
                ]}
                activeItemId="overview"
              />
            }
            navbarCollapsed={collapsed}
            footer={
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-zinc-400">
                © ForgeStack
              </div>
            }
          >
            <PageHeader
              title="Overview"
              description="AppShell composes AppBar + Sidebar + page content."
              actions={<Button size="sm">New</Button>}
            />
            <Typography variant="body2" className="mt-4">
              Main content area scrolls independently of the sticky header.
            </Typography>
          </AppShell>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default AppShellPage;
