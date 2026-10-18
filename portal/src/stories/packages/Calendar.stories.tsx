import type { Meta, StoryObj } from '@storybook/react';
import { EventCalendar } from '@forgedevstack/calendar';
import '@forgedevstack/calendar/styles.css';

const EVENTS = [
  { id: 'run', title: 'Morning Run', start: '2025-07-07T07:00:00', end: '2025-07-07T07:45:00', resourceId: 'health' },
  { id: 'team', title: 'Team Meeting', start: '2025-07-07T09:30:00', end: '2025-07-07T10:30:00', resourceId: 'work' },
  { id: 'birthday', title: 'Alice Birthday', start: '2025-07-03', end: '2025-07-04', allDay: true, resourceId: 'family' },
];

const meta: Meta<typeof EventCalendar> = {
  title: 'Packages/Calendar/EventCalendar',
  component: EventCalendar,
  tags: ['autodocs'],
  args: {
    defaultDate: new Date(2025, 6, 1),
    events: EVENTS,
    showMiniCalendar: true,
    showResourceFilter: true,
  },
  argTypes: {
    showMiniCalendar: { control: 'boolean' },
    showResourceFilter: { control: 'boolean' },
    mode: { control: 'select', options: ['default', 'light', 'dark'] },
  },
};

export default meta;

type Story = StoryObj<typeof EventCalendar>;

export const Month: Story = {};

export const Dark: Story = {
  args: { mode: 'dark' },
};
