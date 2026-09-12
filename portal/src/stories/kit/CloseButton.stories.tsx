import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CloseButton> = {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CloseButton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CloseButton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CloseButton>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <CloseButton {...args} />
      <CloseButton {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CloseButton anywhere below.</Typography>
        <CloseButton {...args} />
        <CloseButton {...args} />
      </Flex>
    </BearProvider>
  ),
};
