import type { Meta, StoryObj } from '@storybook/react';
import { ActionIcon, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ActionIcon> = {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ActionIcon from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ActionIcon anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionIcon>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ActionIcon {...args} />
      <ActionIcon {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ActionIcon anywhere below.</Typography>
        <ActionIcon {...args} />
        <ActionIcon {...args} />
      </Flex>
    </BearProvider>
  ),
};
