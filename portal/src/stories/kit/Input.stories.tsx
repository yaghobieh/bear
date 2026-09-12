import type { Meta, StoryObj } from '@storybook/react';
import { Input, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Input from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Input anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: 'Search Bear',
  },
};

export const WithLabel: Story = {
  render: () => <Input label="Email" placeholder="you@forge.dev" fullWidth />,
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Input placeholder="First input" />
        <Input placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
