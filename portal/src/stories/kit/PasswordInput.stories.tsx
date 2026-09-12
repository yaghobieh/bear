import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PasswordInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PasswordInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <PasswordInput {...args} />
      <PasswordInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PasswordInput anywhere below.</Typography>
        <PasswordInput {...args} />
        <PasswordInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
