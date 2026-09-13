import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, ColorSwatch, ColorSwatchGroup, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ColorSwatchGroup> = {
  title: 'Components/ColorSwatch/ColorSwatchGroup',
  component: ColorSwatchGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ColorSwatchGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    colors: ['#EA0A8E', '#3b82f6', '#10b981', '#f59e0b', '#111827'],
    value: '#EA0A8E',
    multiple: false,
    rounded: false,
    gap: 2,
    showLabel: true,
  },
  argTypes: {
    colors: { control: 'color' },
    onChange: { action: 'onChange' },
    multiple: { control: 'boolean' },
    rounded: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorSwatchGroup>;

export const Basic: Story = {
  render: (args) => <ColorSwatchGroup {...args} />,
};
