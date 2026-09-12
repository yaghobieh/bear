import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ToggleButton {...args} />
      <ToggleButton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ToggleButton anywhere below.</Typography>
        <ToggleButton {...args} />
        <ToggleButton {...args} />
      </Flex>
    </BearProvider>
  ),
};
