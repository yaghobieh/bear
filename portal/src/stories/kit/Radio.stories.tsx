import type { Meta, StoryObj } from '@storybook/react';
import { Radio, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Radio from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Radio anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Radio {...args} />
      <Radio {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Radio anywhere below.</Typography>
        <Radio {...args} />
        <Radio {...args} />
      </Flex>
    </BearProvider>
  ),
};
