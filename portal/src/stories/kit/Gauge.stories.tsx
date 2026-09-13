import type { Meta, StoryObj } from '@storybook/react';
import { Gauge, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Gauge> = {
  title: 'Components/Gauge',
  component: Gauge,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Gauge from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Gauge anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: 42,
    min: 0,
    max: 100,
    size: 0,
    strokeWidth: 320,
    color: '#EA0A8E',
    showLabel: true,
    label: 'Label',
    animated: true,
    fillDurationMs: 0,
    arcAngle: 0,
    variant: 'arc',
  },
  argTypes: {
    color: { control: 'color' },
    trackColor: { control: 'color' },
    showLabel: { control: 'boolean' },
    animated: { control: 'boolean' },
    variant: { control: 'select', options: ['arc', 'linear', 'ring'] },
  },
};

export default meta;

type Story = StoryObj<typeof Gauge>;

export const Basic: Story = {
  render: (args) => <Gauge {...args} />,
};

export const Gradient: Story = {
  render: () => <Gauge value={65} gradient={['#ec4899', '#8b5cf6']} variant="ring" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4} wrap="wrap">
        <Gauge value={25} />
        <Gauge value={75} gradient={['#10b981', '#3b82f6']} />
      </Flex>
    </BearProvider>
  ),
};
