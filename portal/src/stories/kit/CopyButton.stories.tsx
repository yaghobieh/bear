import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CopyButton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CopyButton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <CopyButton {...args} />
      <CopyButton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CopyButton anywhere below.</Typography>
        <CopyButton {...args} />
        <CopyButton {...args} />
      </Flex>
    </BearProvider>
  ),
};
