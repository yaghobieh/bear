import { FC, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs, Typography, useBear } from '@forgedevstack/bear';
import { EventCalendar, EventTimeline } from '@forgedevstack/calendar';
import type { CalendarEvent } from '@forgedevstack/calendar';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable } from '@/components/PropsTable';
import {
  CALENDAR_PREVIEW_CODE,
  CALENDAR_PREVIEW_DATE,
  CALENDAR_PREVIEW_EVENTS,
  CALENDAR_PREVIEW_MONTH,
  CALENDAR_PREVIEW_PROPS,
  CALENDAR_PREVIEW_TIMELINE,
} from './CalendarPreview.const';

export const CalendarPreview: FC = () => {
  const { mode } = useBear();
  const [events, setEvents] = useState<CalendarEvent[]>(CALENDAR_PREVIEW_EVENTS);

  const onEventChange = (event: CalendarEvent) => {
    setEvents((current) => current.map((item) => (item.id === event.id ? event : item)));
  };

  const onEventCreate = (event: CalendarEvent) => {
    setEvents((current) => [...current, event]);
  };

  const onEventDelete = (event: CalendarEvent) => {
    setEvents((current) => current.filter((item) => item.id !== event.id));
  };

  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultTab={CALENDAR_PREVIEW_MONTH}>
        <TabList className="mb-4">
          <Tab id={CALENDAR_PREVIEW_MONTH}>Month</Tab>
          <Tab id={CALENDAR_PREVIEW_TIMELINE}>Timeline</Tab>
        </TabList>
        <TabPanel tabId={CALENDAR_PREVIEW_MONTH}>
          <EventCalendar
            mode={mode}
            title=""
            description=""
            defaultDate={CALENDAR_PREVIEW_DATE}
            events={events}
            onEventChange={onEventChange}
            onEventCreate={onEventCreate}
            onEventDelete={onEventDelete}
          />
        </TabPanel>
        <TabPanel tabId={CALENDAR_PREVIEW_TIMELINE}>
          <EventTimeline
            defaultDate={CALENDAR_PREVIEW_DATE}
            events={events}
            onEventChange={onEventChange}
            onEventCreate={onEventCreate}
            onEventDelete={onEventDelete}
          />
        </TabPanel>
      </Tabs>
      <section>
        <Typography variant="h4" className="mb-3">Usage</Typography>
        <CodeBlock code={CALENDAR_PREVIEW_CODE} language="tsx" showLineNumbers={false} />
      </section>
      <PropsTable title="Event calendar props" rows={CALENDAR_PREVIEW_PROPS} />
    </div>
  );
};
