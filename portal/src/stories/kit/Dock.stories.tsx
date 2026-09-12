import type { Meta, StoryObj } from '@storybook/react';
import { Dock, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Dock> = {
  title: 'Components/Dock',
  component: Dock,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Dock from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Dock anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dock>;

const ITEMS = [
  { id: 'home', label: 'Home', icon: <Typography>H</Typography> },
  { id: 'search', label: 'Search', icon: <Typography>S</Typography> },
  { id: 'more', label: 'More', icon: <Typography>M</Typography> },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
    position: 'bottom',
  },
};

export const Top: Story = {
  args: {
    items: ITEMS,
    position: 'top',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Dock {...args} />
        <Dock items={ITEMS} position="top" />
      </Flex>
    </BearProvider>
  ),
};
