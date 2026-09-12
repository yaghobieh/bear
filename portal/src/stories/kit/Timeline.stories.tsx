import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Timeline from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Timeline anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const ITEMS = [
  { title: 'Shipped', time: '09:00', description: 'First release' },
  { title: 'Review', time: '11:00', description: 'Design review', active: true },
  { title: 'Done', time: '16:00', description: 'Closed' },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
  },
};

export const Alternate: Story = {
  args: {
    items: ITEMS,
    position: 'alternate',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Timeline {...args} />
        <Timeline items={ITEMS} size="sm" />
      </Flex>
    </BearProvider>
  ),
};
