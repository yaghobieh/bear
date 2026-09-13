import type { Meta, StoryObj } from '@storybook/react';
import { ActivityItem, Badge, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    title: 'Title',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof ActivityItem>;

const ICON = <Badge variant="primary" size="sm">A</Badge>;

export const Basic: Story = {
  render: (args) => <ActivityItem {...args} />,
};

export const WithUser: Story = {
  render: () => (
    <ActivityItem
      icon={<Typography variant="caption">B</Typography>}
      title="Opened a pull request"
      description="Release notes for Chart and the component catalog."
      time="1h"
      user="Ada"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ActivityItem icon={ICON} title="Published a post" time="2m" user="Ada" />
        <ActivityItem icon={ICON} title="Commented on a review" time="8m" user="Grace" />
      </Flex>
    </BearProvider>
  ),
};
