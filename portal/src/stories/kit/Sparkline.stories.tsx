import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Sparkline from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Sparkline anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    width: 320,
    height: 240,
    color: '#EA0A8E',
    fill: false,
    strokeWidth: 2,
    showExtremes: true,
    animated: true,
    variant: 'line',
    showLastPoint: true,
  },
  argTypes: {
    color: { control: 'color' },
    fill: { control: 'boolean' },
    showExtremes: { control: 'boolean' },
    animated: { control: 'boolean' },
    variant: { control: 'select', options: ['line', 'area', 'bars'] },
    showLastPoint: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Sparkline>;

const DATA = [10, 25, 18, 35, 28, 45, 38, 60, 52, 75];

export const Basic: Story = {
  args: {
    data: DATA,
  },
  render: (args) => <Sparkline {...args} />,
};

export const Filled: Story = {
  render: () => (
    <Sparkline data={DATA} width={160} height={40} fill color="#10b981" showExtremes />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Sparkline data={DATA} width={120} height={32} />
        <Sparkline data={DATA} width={160} height={40} variant="bars" />
      </Flex>
    </BearProvider>
  ),
};
