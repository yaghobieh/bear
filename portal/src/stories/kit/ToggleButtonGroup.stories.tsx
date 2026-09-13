import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, ToggleButton, ToggleButtonGroup, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Components/ToggleButton/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ToggleButtonGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    value: 'bold',
    exclusive: true,
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    exclusive: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Basic: Story = {
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="bold">Bold</ToggleButton>
      <ToggleButton value="italic">Italic</ToggleButton>
    </ToggleButtonGroup>
  ),
};
