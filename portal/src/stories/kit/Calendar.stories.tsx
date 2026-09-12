import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Calendar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Calendar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Calendar {...args} />
      <Calendar {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Calendar anywhere below.</Typography>
        <Calendar {...args} />
        <Calendar {...args} />
      </Flex>
    </BearProvider>
  ),
};
