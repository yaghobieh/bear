import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, ToggleButton, ToggleButtonGroup } from '@forgedevstack/bear';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ToggleButton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ToggleButton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { ToggleButtonGroup },
  args: {
    children: 'Bold',
    selected: false,
    fullWidth: false,
  },
  argTypes: {
    selected: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {
  render: (args) => <ToggleButton {...args} />,
};

export const Selected: Story = {
  render: () => (
    <Flex gap={2}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center" selected>
        Center
      </ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <ToggleButton value="first">First</ToggleButton>
        <ToggleButton value="reuse" selected>
          Reuse
        </ToggleButton>
      </Flex>
    </BearProvider>
  ),
};
