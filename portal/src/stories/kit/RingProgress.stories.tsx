import type { Meta, StoryObj } from '@storybook/react';
import { RingProgress, BearProvider, Flex, Typography } from '@forgedevstack/bear';
import type { RingProgressSection } from '@forgedevstack/bear';

const meta: Meta<typeof RingProgress> = {
  title: 'Components/RingProgress',
  component: RingProgress,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RingProgress from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RingProgress anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    size: 120,
    thickness: 12,
    roundCaps: true,
    label: '72%',
    variant: 'full',
  },
  argTypes: {
    roundCaps: { control: 'boolean' },
    rootColor: { control: 'color' },
    variant: { control: 'select', options: ['full', 'half'] },
  },
};

export default meta;

type Story = StoryObj<typeof RingProgress>;

const SINGLE: RingProgressSection[] = [{ value: 72, color: '#ec4899' }];

const MULTI: RingProgressSection[] = [
  { value: 40, color: '#ec4899' },
  { value: 25, color: '#8b5cf6' },
  { value: 15, color: '#06b6d4' },
];

export const Basic: Story = {
  args: {
    sections: SINGLE,
  },
  render: (args) => <RingProgress {...args} />,
};

export const MultipleSections: Story = {
  render: () => <RingProgress sections={MULTI} roundCaps />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4} wrap="wrap">
        <RingProgress sections={SINGLE} />
        <RingProgress sections={MULTI} />
      </Flex>
    </BearProvider>
  ),
};
