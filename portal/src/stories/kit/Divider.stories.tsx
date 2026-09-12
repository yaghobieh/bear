import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Divider from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Divider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Divider {...args} />
      <Divider {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Divider anywhere below.</Typography>
        <Divider {...args} />
        <Divider {...args} />
      </Flex>
    </BearProvider>
  ),
};
