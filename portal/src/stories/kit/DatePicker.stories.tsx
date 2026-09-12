import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DatePicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DatePicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <DatePicker {...args} />
      <DatePicker {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse DatePicker anywhere below.</Typography>
        <DatePicker {...args} />
        <DatePicker {...args} />
      </Flex>
    </BearProvider>
  ),
};
