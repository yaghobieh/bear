import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NumberInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NumberInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <NumberInput {...args} />
      <NumberInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse NumberInput anywhere below.</Typography>
        <NumberInput {...args} />
        <NumberInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
