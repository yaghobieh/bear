import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, BearProvider, Flex } from '@forgedevstack/bear';

const EVENT_DATE = new Date('2026-09-12');

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
  args: {
    value: new Date('2026-09-12'),
    minDate: new Date('2026-09-12'),
    maxDate: new Date('2026-09-12'),
    disabled: false,
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    range: false,
    rangeValue: [new Date('2026-09-01'), new Date('2026-09-12')],
    clearable: false,
    showWeekNumbers: true,
    firstDayOfWeek: 0,
    size: 'sm',
    variant: 'default',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onRangeChange: { action: 'onRangeChange' },
    disabled: { control: 'boolean' },
    range: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showWeekNumbers: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'filled', 'outline'] },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  render: (args) => <DatePicker {...args} />,
};

export const Outline: Story = {
  render: () => (
    <DatePicker
      label="Due date"
      value={EVENT_DATE}
      variant="outline"
      helperText="Opens a calendar popover"
      clearable
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <DatePicker label="Start" value={EVENT_DATE} placeholder="First picker" />
        <DatePicker label="Reuse" value={EVENT_DATE} size="sm" variant="outline" />
      </Flex>
    </BearProvider>
  ),
};
