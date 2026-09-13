import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, ColorSwatch, ColorSwatchGroup, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ColorSwatch from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ColorSwatch anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { ColorSwatchGroup },
  args: {
    color: '#EA0A8E',
    selected: false,
    rounded: false,
    label: 'Label',
  },
  argTypes: {
    color: { control: 'color' },
    selected: { control: 'boolean' },
    rounded: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorSwatch>;

export const Basic: Story = {
  render: (args) => <ColorSwatch {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <ColorSwatch color="#ef4444" size="sm" />
      <ColorSwatch color="#22c55e" size="md" selected />
      <ColorSwatch color="#3b82f6" size="lg" />
      <ColorSwatch color="#EA0A8E" size="xl" label="Pink" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <ColorSwatch color="#EA0A8E" />
        <ColorSwatch color="#3b82f6" selected />
      </Flex>
    </BearProvider>
  ),
};
