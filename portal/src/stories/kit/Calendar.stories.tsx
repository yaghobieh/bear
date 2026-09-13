import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const VIEW_DATE = new Date('2026-09-01');
const SELECTED_DATE = new Date('2026-09-12');

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
  args: {
    viewDate: new Date('2026-09-12'),
    value: new Date('2026-09-12'),
    minDate: new Date('2026-09-12'),
    maxDate: new Date('2026-09-12'),
    firstDayOfWeek: 0,
    showWeekNumbers: true,
    clearable: false,
    showTodayButton: true,
    inline: false,
    open: false,
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onViewChange: { action: 'onViewChange' },
    showWeekNumbers: { control: 'boolean' },
    clearable: { control: 'boolean' },
    onClear: { action: 'onClear' },
    showTodayButton: { control: 'boolean' },
    onToday: { action: 'onToday' },
    inline: { control: 'boolean' },
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  render: (args) => <Calendar {...args} />,
};

export const SelectedDate: Story = {
  render: () => (
    <Calendar
      viewDate={VIEW_DATE}
      value={SELECTED_DATE}
      showTodayButton
      clearable
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Calendar anywhere below.</Typography>
        <Calendar viewDate={VIEW_DATE} />
        <Calendar viewDate={VIEW_DATE} value={SELECTED_DATE} />
      </Flex>
    </BearProvider>
  ),
};
