import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, Sidebar, PageHeader, BearProvider, Flex, Typography, Button } from '@forgedevstack/bear';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

const ASIDE_ITEMS = [
  { id: 'activity', label: 'Activity' },
  { id: 'files', label: 'Files' },
];

const meta: Meta<typeof AppShell> = {
  title: 'Components/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AppShell from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AppShell anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    navbarCollapsed: false,
    stickyHeader: false,
    stickyFooter: false,
    padding: false,
  },
  argTypes: {
    navbarCollapsed: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    stickyFooter: { control: 'boolean' },
    padding: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const Basic: Story = {
  render: (args) => (
    <AppShell {...args}
      header={<Typography>Forge Ops</Typography>}
      navbar={<Sidebar items={NAV_ITEMS} activeItemId="overview" />}
      footer={<Typography>© ForgeStack</Typography>}
    >
      <PageHeader title="Overview" description="App chrome with header, nav, and main." />
    </AppShell>
  ),
};

export const WithAside: Story = {
  render: () => (
    <AppShell
      header={<Typography>Forge Ops</Typography>}
      navbar={<Sidebar items={NAV_ITEMS} activeItemId="reports" />}
      aside={<Sidebar items={ASIDE_ITEMS} activeItemId="activity" position="right" />}
      navbarWidth="sm"
    >
      <PageHeader title="Reports" actions={<Button size="sm">Export</Button>} />
    </AppShell>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <AppShell header={<Typography>First</Typography>} navbar={<Sidebar items={NAV_ITEMS} activeItemId="overview" />}>
          <Typography>First shell</Typography>
        </AppShell>
        <AppShell header={<Typography>Reuse</Typography>} navbar={<Sidebar items={NAV_ITEMS} activeItemId="settings" />}>
          <Typography>Second shell, same provider</Typography>
        </AppShell>
      </Flex>
    </BearProvider>
  ),
};
