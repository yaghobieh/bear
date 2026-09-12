import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BottomNavigation from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BottomNavigation anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

const ITEMS = [
  { id: 'home', label: 'Home', icon: <Typography>•</Typography> },
  { id: 'search', label: 'Search', icon: <Typography>•</Typography> },
  { id: 'more', label: 'More', icon: <Typography>•</Typography> },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
    value: 'home',
  },
};

export const AlwaysLabels: Story = {
  args: {
    items: ITEMS,
    value: 'search',
    showLabels: 'always',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
    value: 'home',
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <BottomNavigation {...args} />
        <BottomNavigation items={ITEMS} value="more" />
      </Flex>
    </BearProvider>
  ),
};
