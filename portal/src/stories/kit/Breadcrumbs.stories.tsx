import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Breadcrumbs, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Breadcrumbs from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Breadcrumbs anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components' },
      { label: 'Breadcrumbs' },
    ],
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    showHomeIcon: true,
  },
  argTypes: {
    showHomeIcon: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Components' },
  { label: 'Breadcrumbs' },
];

export const Basic: Story = {
  render: (args) => <Breadcrumbs {...args} />,
};

export const Compact: Story = {
  args: {
    items: ITEMS,
    showHomeIcon: false,
    size: 'sm',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
    showHomeIcon: true,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Breadcrumbs {...args} />
        <Breadcrumbs items={ITEMS} size="sm" />
      </Flex>
    </BearProvider>
  ),
};
