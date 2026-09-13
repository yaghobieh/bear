import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl, BearProvider, Flex } from '@forgedevstack/bear';
import type { SegmentedControlItem } from '@forgedevstack/bear';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SegmentedControl from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SegmentedControl anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    size: 'sm',
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const VIEW_ITEMS: SegmentedControlItem[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

const SIZE_ITEMS: SegmentedControlItem[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export const Basic: Story = {
  args: {
    items: VIEW_ITEMS,
  },
  render: (args) => <SegmentedControl {...args} />,
};

export const FullWidth: Story = {
  render: () => (
    <SegmentedControl items={SIZE_ITEMS} defaultValue="a" fullWidth />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <SegmentedControl items={VIEW_ITEMS} defaultValue="list" />
        <SegmentedControl items={SIZE_ITEMS} defaultValue="b" />
      </Flex>
    </BearProvider>
  ),
};
