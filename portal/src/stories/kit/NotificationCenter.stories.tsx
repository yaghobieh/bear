import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NotificationCenter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NotificationCenter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationCenter>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <NotificationCenter {...args}>
      <Typography>NotificationCenter</Typography>
    </NotificationCenter>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <NotificationCenter {...args}>
        <Typography>First</Typography>
      </NotificationCenter>
      <NotificationCenter>
        <Typography>Second</Typography>
      </NotificationCenter>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse NotificationCenter anywhere below.</Typography>
        <NotificationCenter {...args}>
          <Typography>First use</Typography>
        </NotificationCenter>
        <NotificationCenter>
          <Typography>Second use</Typography>
        </NotificationCenter>
      </Flex>
    </BearProvider>
  ),
};
