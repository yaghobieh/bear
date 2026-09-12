import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <AppShell {...args}>
      <Typography>AppShell</Typography>
    </AppShell>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <AppShell {...args}>
        <Typography>First</Typography>
      </AppShell>
      <AppShell>
        <Typography>Second</Typography>
      </AppShell>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse AppShell anywhere below.</Typography>
        <AppShell {...args}>
          <Typography>First use</Typography>
        </AppShell>
        <AppShell>
          <Typography>Second use</Typography>
        </AppShell>
      </Flex>
    </BearProvider>
  ),
};
