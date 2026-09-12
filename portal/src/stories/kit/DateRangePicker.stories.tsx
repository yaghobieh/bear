import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DateRangePicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DateRangePicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <DateRangePicker {...args}>
      <Typography>DateRangePicker</Typography>
    </DateRangePicker>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <DateRangePicker {...args}>
        <Typography>First</Typography>
      </DateRangePicker>
      <DateRangePicker>
        <Typography>Second</Typography>
      </DateRangePicker>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse DateRangePicker anywhere below.</Typography>
        <DateRangePicker {...args}>
          <Typography>First use</Typography>
        </DateRangePicker>
        <DateRangePicker>
          <Typography>Second use</Typography>
        </DateRangePicker>
      </Flex>
    </BearProvider>
  ),
};
