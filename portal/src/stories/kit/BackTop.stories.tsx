import type { Meta, StoryObj } from '@storybook/react';
import { BackTop, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof BackTop> = {
  title: 'Components/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BackTop from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BackTop anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BackTop>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <BackTop {...args} />
      <BackTop {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse BackTop anywhere below.</Typography>
        <BackTop {...args} />
        <BackTop {...args} />
      </Flex>
    </BearProvider>
  ),
};
