import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TimePicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TimePicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <TimePicker {...args} />
      <TimePicker {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TimePicker anywhere below.</Typography>
        <TimePicker {...args} />
        <TimePicker {...args} />
      </Flex>
    </BearProvider>
  ),
};
