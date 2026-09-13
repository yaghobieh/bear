import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const RANGE = {
  start: new Date('2026-09-01'),
  end: new Date('2026-09-12'),
};

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
  args: {
    value: RANGE,
    label: 'Label',
    placeholder: 'Type here',
    disabled: false,
    clearable: false,
    minDate: new Date('2026-09-12'),
    maxDate: new Date('2026-09-12'),
    showPresets: true,
    size: 'sm',
    helperText: 'Helper text',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showPresets: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {
  render: (args) => <DateRangePicker {...args} />,
};

export const WithPresets: Story = {
  render: () => (
    <DateRangePicker
      label="Booking period"
      helperText="Select check-in and check-out"
      value={RANGE}
      showPresets
      clearable
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse DateRangePicker anywhere below.</Typography>
        <DateRangePicker value={RANGE} placeholder="First range" />
        <DateRangePicker value={RANGE} size="sm" placeholder="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
