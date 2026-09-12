import type { Meta, StoryObj } from '@storybook/react';
import { ActivityItem, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ActivityItem> = {
  title: 'Components/ActivityItem',
  component: ActivityItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ActivityItem from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ActivityItem anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActivityItem>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ActivityItem {...args}>
      <Typography>ActivityItem</Typography>
    </ActivityItem>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ActivityItem {...args}>
        <Typography>First</Typography>
      </ActivityItem>
      <ActivityItem>
        <Typography>Second</Typography>
      </ActivityItem>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ActivityItem anywhere below.</Typography>
        <ActivityItem {...args}>
          <Typography>First use</Typography>
        </ActivityItem>
        <ActivityItem>
          <Typography>Second use</Typography>
        </ActivityItem>
      </Flex>
    </BearProvider>
  ),
};
