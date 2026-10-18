import type { CalendarEvent } from '@forgedevstack/calendar';

export const CALENDAR_PREVIEW_DATE = new Date(2025, 6, 1);
export const CALENDAR_PREVIEW_MONTH = 'month';
export const CALENDAR_PREVIEW_TIMELINE = 'timeline';

export const CALENDAR_PREVIEW_CODE = `npm install @forgedevstack/bear @forgedevstack/calendar

import { EventCalendar, EventTimeline } from '@forgedevstack/calendar';
import '@forgedevstack/calendar/styles.css';
import '@forgedevstack/bear/styles.css';

<EventCalendar
  events={events}
  onEventChange={setEvent}
  onEventCreate={addEvent}
  onEventDelete={removeEvent}
/>`;

export const CALENDAR_PREVIEW_PROPS = [
  { name: 'events', type: 'CalendarEvent[]', default: '[]', description: 'Events shown on the month grid and the timeline' },
  { name: 'resources', type: 'CalendarResource[]', default: 'Work, Health, Social, Personal, Travel, Family', description: 'Rows and filter checkboxes' },
  { name: 'defaultDate', type: 'Date', default: 'today', description: 'Month the calendar opens on' },
  { name: 'mode', type: "'light' | 'dark' | 'default'", default: 'follows the page theme', description: 'Surface color for the grid, mini month, and filters' },
  { name: 'showMiniCalendar', type: 'boolean', default: 'true', description: 'Bear month picker in the side panel' },
  { name: 'showResourceFilter', type: 'boolean', default: 'true', description: 'Resource checkboxes that hide events' },
  { name: 'onEventChange', type: '(event) => void', description: 'Save from the side editor' },
  { name: 'onEventCreate', type: '(event) => void', description: 'Create from a day click' },
  { name: 'onEventDelete', type: '(event) => void', description: 'Delete from the side editor' },
];

export const CALENDAR_PREVIEW_EVENTS: CalendarEvent[] = [
  { id: 'yoga', title: 'Yoga', start: '2025-07-02T07:00:00', end: '2025-07-02T08:00:00', resourceId: 'health' },
  { id: 'birthday', title: 'Alice Birthday', start: '2025-07-03', end: '2025-07-04', allDay: true, resourceId: 'family' },
  { id: 'bbq', title: '4th of July BBQ', start: '2025-07-04T12:00:00', end: '2025-07-04T17:00:00', resourceId: 'social' },
  { id: 'run', title: 'Morning Run', start: '2025-07-07T07:00:00', end: '2025-07-07T07:45:00', resourceId: 'health' },
  { id: 'team', title: 'Team Meeting', start: '2025-07-07T09:30:00', end: '2025-07-07T10:30:00', resourceId: 'work' },
  { id: 'design', title: 'Design Review', start: '2025-07-09T14:00:00', end: '2025-07-09T16:00:00', resourceId: 'work' },
  { id: 'grocery', title: 'Grocery Shopping', start: '2025-07-26T10:00:00', end: '2025-07-26T11:30:00', resourceId: 'personal' },
  { id: 'packing', title: 'Packing for Vacation', start: '2025-08-02T14:00:00', end: '2025-08-02T16:00:00', resourceId: 'travel' },
  { id: 'dashboard', title: 'Analytics Dashboard', start: '2025-07-01', end: '2025-08-20', resourceId: 'work' },
  { id: 'hiring', title: 'Q3 Hiring Sprint', start: '2025-07-01', end: '2025-07-18', resourceId: 'personal' },
  { id: 'campaign', title: 'Q3 Campaign', start: '2025-07-01', end: '2025-07-31', resourceId: 'social' },
];
