import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton, BearProvider, Card, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'onClick' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CloseButton>;

export const Basic: Story = {
  render: (args) => <CloseButton {...args} />,
};

export const OnCard: Story = {
  render: () => (
    <Card padding="md">
      <Flex justify="between" align="center">
        <Typography variant="subtitle1">Dismiss this panel</Typography>
        <CloseButton aria-label="Close panel" />
      </Flex>
    </Card>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} align="center">
        <CloseButton size="sm" aria-label="Close small" />
        <CloseButton size="md" aria-label="Close medium" />
        <CloseButton size="lg" aria-label="Close large" />
      </Flex>
    </BearProvider>
  ),
};
